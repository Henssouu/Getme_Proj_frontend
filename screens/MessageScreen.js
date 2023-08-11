import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";

const MessageScreen = () => {
  const user = useSelector((state) => state.user.value);
  const [messages, setMessages] = useState([]);
  const [receiverUserId, setReceiverUserId] = useState("");
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    // Fetch les messages de l'utilisateur loggé
    fetch(
      `http://${process.env.EXPO_PUBLIC_IP_STRING}:3000/api/messages/get-messages/${user.token}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMessages(data.messages);
      })
      .catch((error) => {
        console.error("Erreur pendant le fetch des messages:", error);
      });
  }, []);

  const handleSendMessage = () => {
    // envoi un nouveau message  au destinataire en utilisant son userId
    fetch(
      `http://${process.env.EXPO_PUBLIC_IP_STRING}:3000/api/messages/send-message`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: user._id,
          receiver: receiverUserId,
          content: replyContent,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Refresh les messages après un envoi
        setMessages(data.messages);
        setReplyContent(""); // vide le champs reply
      })
      .catch((error) => {
        console.error("Erreur pendant l'envoi du message:", error);
      });
  };


  const handleReply = (messageId) => {
    // Send a reply for the specified message
    fetch(
      `http://${process.env.EXPO_PUBLIC_IP_STRING}:3000/api/messages/reply-message/${messageId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender: user._id, content: replyContent }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Refresh the messages after sending the reply
        setMessages(data.messages);
      })
      .catch((error) => {
        console.error("Error sending reply:", error);
      });
  };




  const renderItem = ({ item }) => {
    return (
      <View style={styles.messageContainer}>
        {item.sender && <Text style={styles.sender}>{item.sender.pseudo}</Text>}
        <Text style={styles.content}>{item.content}</Text>
        {/* Affiche les reply */}
        {item.replies && (
          <FlatList
            data={item.replies}
            keyExtractor={(item, index) => `${item._id}-${index}`}
            renderItem={({ item }) => (
              <View style={styles.replyContainer}>
                {item.sender && (
                  <Text style={styles.sender}>{item.sender.pseudo}</Text>
                )}
                <Text style={styles.content}>{item.content}</Text>
              </View>
            )}
          />
        )}
        {/* champs reply */}
        <TextInput
          style={styles.replyInput}
          placeholder="Reply..."
          onChangeText={(text) => setReplyContent(text)}
          value={replyContent}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => handleReply(item._id)}
          disabled={!replyContent}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.userIdInput}
          placeholder="Destinataire..."
          onChangeText={setReceiverUserId}
          value={receiverUserId}
        />
        <TextInput
          style={styles.replyInput}
          placeholder="Message..."
          onChangeText={setReplyContent}
          value={replyContent}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSendMessage}
          disabled={!receiverUserId || !replyContent}
        >
          <Text style={styles.sendButtonText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 70,
  },
  inputContainer: {
    marginBottom: 10,
  },
  userIdInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 8,
    marginTop: 5,
    marginBottom: 5,
  },
  messageContainer: {
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 8,
  },
  sender: {
    fontWeight: "bold",
  },
  content: {
    marginTop: 3,
  },
  replyContainer: {
    backgroundColor: "#f5f5f5",
    marginTop: 1,
    padding: 6,
    borderRadius: 5,
  },
  replyInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 8,
    marginTop: 5,
  },
  sendButton: {
    backgroundColor: "blue",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginTop: 1,
    alignItems: "center",
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default MessageScreen;
