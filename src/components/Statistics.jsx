import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, ResponsiveContainer
} from 'recharts'
import './Statistics.css';

export const Statistics = () => {
    const userId = sessionStorage.getItem('userid');
    const [history, setHistory] = useState([])
  const [emotionStats, setEmotionStats] = useState([])
  const [emotionOverTime, setEmotionOverTime] = useState([])
  const getRandomColor = (str) => {
        let hash = 0
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash)
        }
        let color = '#'
        for (let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xff
            color += ('00' + value.toString(16)).slice(-2)
        }
        return color
    }


    useEffect(() => {
    const fetchHistory = async () => {
        const token = sessionStorage.getItem('token')
        try {
        const response = await axios.get(`http://localhost:3001/users/history/${userId}`, {
            headers: {
            Authorization: `Bearer ${token}`
            }
        })

        const data = response.data.history
        setHistory(data)

        // ===============================
        // BarChart
        // ===============================
        const emotionCount = {}
        data.forEach(item => {
            const emotion = item.emotion
            emotionCount[emotion] = (emotionCount[emotion] || 0) + 1
        })

        const emotionData = Object.entries(emotionCount).map(([emotion, count]) => ({
            emotion, count
        }))
        setEmotionStats(emotionData)

        // ===============================
        // Linchart
        // ===============================
        const dateEmotionMap = {}

        data.forEach(item => {
            const date = new Date(item.createdAt).toLocaleDateString()
            const emotion = item.emotion

            if (!dateEmotionMap[date]) {
            dateEmotionMap[date] = {}
            }

            dateEmotionMap[date][emotion] = (dateEmotionMap[date][emotion] || 0) + 1
        })

        const overTimeData = Object.entries(dateEmotionMap).map(([date, emotions]) => ({
            date,
            ...emotions
        }))

        setEmotionOverTime(overTimeData)

        } catch (err) {
        console.error('Error loading history:', err)
        }
    }

    fetchHistory()
    }, [userId])

  return (
    <div style={{ padding: '20px' }}>
    <div className="statistics-main-text">
      <h2>Recommendation Statistics</h2>
    </div>
    <h3>Recommendations by emotion</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={emotionStats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="emotion" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" name="Recommendations" />
        </BarChart>
      </ResponsiveContainer>

      <h3>Emotional evolution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={emotionOverTime}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            {Object.keys(emotionOverTime[0] || {}).filter(key => key !== 'date').map(emotion => (
            <Line
                key={emotion}
                type="monotone"
                dataKey={emotion}
                stroke={getRandomColor(emotion)}
                name={emotion}
            />
            ))}
        </LineChart>
        </ResponsiveContainer>
    </div>
  )
}
