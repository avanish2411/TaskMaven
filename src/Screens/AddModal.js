import React from 'react'
import { View, Text , Modal, TextInput, TouchableOpacity,} from 'react-native'

export default function AddModal({ modalVisible, setModalVisible, addTodo, title, setTitle, detail, setDetail }) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View style={{ backgroundColor: 'white', padding: 20, height: 500 }}>
                    <Text style={{ color: 'black', fontWeight: '600', fontSize: 24, marginBottom: 10 }}>Title</Text>
                    <View style={{ backgroundColor: 'grey', marginBottom: 10, borderRadius: 16 }}>
                        <TextInput
                            placeholder="Write title.."
                            placeholderTextColor='black'
                            value={title}
                            onChangeText={(text) => setTitle(text)}
                            style={{ paddingLeft: 16, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: 'gray', color: "white", fontWeight: '400' }}
                        />
                    </View>
                    <Text style={{ color: 'black', fontWeight: '600', fontSize: 24, marginBottom: 10 }}>Details</Text>
                    <View style={{ backgroundColor: 'grey', borderRadius: 16 }}>
                        <TextInput
                            placeholder="Write Details"
                            placeholderTextColor='black'
                            value={detail}
                            onChangeText={(text) => setDetail(text)}
                            style={{ paddingLeft: 16, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: 'gray', color: "white", fontWeight: '400' }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: "center", marginBottom: 10 }}>
                        <TouchableOpacity style={{ backgroundColor: 'blue', paddingHorizontal: 30, paddingVertical: 10, borderRadius: 5, marginTop: 10 }} onPress={addTodo}>
                            <Text style={{ color: 'white', textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16 }}>Add</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: 'red', paddingHorizontal: 30, paddingVertical: 10, borderRadius: 5, marginTop: 10 }} onPress={() => setModalVisible(false)}>
                            <Text style={{ color: 'white', textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16 }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}