import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Profile() {
  const [completedTasks, setCompletedTasks] = useState(0)
  const [pendingTasks, setPendingTasks] = useState(0)

  const fetchTaskData = async () => {
    try {
      const response = await axios.get("http://162.16.2.190:3000/todos/count")
      const { totalCompletedTodos, totalPendingTodos } = response.data;
      setCompletedTasks(totalCompletedTodos);
      setPendingTasks(totalPendingTodos);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    fetchTaskData();
  }, [])
  console.log("completed", completedTasks);
  console.log("pending", pendingTasks);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' ,padding:8}}>
      <View>
        <Text style={{color:'black',fontWeight:'600',fontSize:24}}>Tasks Overview</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginVertical: 8, }}>
          <View style={{ backgroundColor: "#89CFF0", padding: 10, borderRadius: 8, flex: 1, justifyContent: "center", alignItems: "center", }}>
            <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" ,color:'black',fontSize:14,}}>
              {completedTasks}
            </Text>
            <Text style={{ marginTop: 4,color:'black',fontSize:16 }}>Completed tasks</Text>
          </View>

          <View style={{ backgroundColor: "#89CFF0", padding: 10, borderRadius: 8, flex: 1, justifyContent: "center", alignItems: "center", }}>
            <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" ,color:'black',fontSize:14,}}>
              {pendingTasks}
            </Text>
            <Text style={{ marginTop: 4,color:'black',fontSize:16 }}>Pending tasks</Text>
          </View>
        </View>
      </View>

    </View>
  )
}