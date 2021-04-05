'use strict'
import moment from 'moment'
import Redis from 'ioredis'

const redisClient = new Redis()
const WINDOW_SIZE_IN_HOURS = 24
const MAX_WINDOW_REQUEST_COUNT = 100
const WINDOW_LOG_INTERVAL_IN_HOURS = 1

export const rateLimiter = async (req, res, next) => {
  try {
    if (!redisClient) {
      throw new Error('Redis client does not exist!')
      // process.exit(1)
    }
    // fetch records of current user using IP address, returns null when no record is found
    redisClient.get(req.ip, function (err, record) {
      if (err) throw err
      const currentRequestTime = moment()
      // console.log('redis ' + record)
      //  if no record is found , create a new record for user and store to redis
      if (record == null) {
        const newRecord = []
        const requestLog = {
          requestTimeStamp: currentRequestTime.unix(),
          requestCount: 1
        }
        newRecord.push(requestLog)
        redisClient.set(req.ip, JSON.stringify(newRecord))
        return next()
      } else {
      // if record is found, parse it's value and calculate number of requests users has made within the last window
        const data = JSON.parse(record)
        const windowStartTimestamp = moment()
          .subtract(WINDOW_SIZE_IN_HOURS, 'hours')
          .unix()
        const requestsWithinWindow = data.filter(entry => {
          return entry.requestTimeStamp > windowStartTimestamp
        })
        const totalWindowRequestsCount = requestsWithinWindow.reduce((accumulator, entry) => {
          return accumulator + entry.requestCount
        }, 0)
        // if number of requests made is greater than or equal to the desired maximum, return error
        if (totalWindowRequestsCount >= MAX_WINDOW_REQUEST_COUNT) {
          res
            .status(429)
            .jsend.error(
            `You have exceeded the ${MAX_WINDOW_REQUEST_COUNT} requests in ${WINDOW_SIZE_IN_HOURS} hrs limit!`
            )
        } else {
        // if number of requests made is less than allowed maximum, log new entry
          const lastRequestLog = data[data.length - 1]
          const potentialCurrentWindowIntervalStartTimeStamp = currentRequestTime
            .subtract(WINDOW_LOG_INTERVAL_IN_HOURS, 'hours')
            .unix()
          //  if interval has not passed since last request log, increment counter
          if (lastRequestLog.requestTimeStamp > potentialCurrentWindowIntervalStartTimeStamp) {
            lastRequestLog.requestCount++
            data[data.length - 1] = lastRequestLog
          } else {
          //  if interval has passed, log new entry for current user and timestamp
            data.push({
              requestTimeStamp: currentRequestTime.unix(),
              requestCount: 1
            })
          }
          redisClient.set(req.ip, JSON.stringify(data))
          next()
        }
      }
    })
  } catch (error) {
    next(error)
  }
}
