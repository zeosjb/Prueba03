import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Modal as RNWModal } from "react-native";
import { PaperProvider, Card, Text, Button } from "react-native-paper";
import axios from "axios";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        alert("Error fetching posts:", error);
      });

    axios
      .get("http://localhost:3000/comments")
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        alert("Error fetching comments:", error);
      });
  }, []);

  const getCommentsForPost = (postId) => {
    return comments.filter((comment) => comment.postId === postId);
  };

  const showModal = (postId) => {
    setSelectedPostId(postId);
    setModalVisible(true);
  };

  const hideModal = () => {
    setSelectedPostId(null);
    setModalVisible(false);
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`http://localhost:3000/posts/${selectedPostId}`);
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== selectedPostId)
      );
      alert(`Delete post with ID ${selectedPostId}`);
    } catch (error) {
      alert(`Error deleting post with ID ${selectedPostId}: ${error.message}`);
    } finally {
      hideModal();
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.textView}>List of Posts</Text>
        {posts.map((post) => (
          <Card key={post.id} style={styles.cardView}>
            <Card.Cover source={{ uri: post.image }} style={styles.cardCover} />
            <Card.Title
              title={post.title}
              subtitle={`Author: ${post.author}`}
            />
            <Card.Content>
              {getCommentsForPost(post.id).map((comment) => (
                <Text key={comment.id} style={styles.commentView}>
                  {comment.body}
                </Text>
              ))}
              <Button
                icon="delete"
                mode="outlined"
                style={styles.buttonView}
                onPress={() => showModal(post.id)}
                color="#FF0000"
              >
                Delete
              </Button>
            </Card.Content>
          </Card>
        ))}
        <RNWModal
          visible={modalVisible}
          onRequestClose={hideModal}
          transparent
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Are you sure you want to delete this post?
            </Text>
            <Button onPress={handleDeletePost} color="#FF0000">
              Yes, Delete
            </Button>
            <Button onPress={hideModal}>Cancel</Button>
          </View>
        </RNWModal>
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0096ff",
    alignItems: "center",
    justifyContent: "center",
  },
  cardView: {
    width: "95%",
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
    elevation: 3,
  },
  cardCover: {
    height: 400,
    resizeMode: "cover",
  },
  infoView: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  textView: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 5,
  },
  commentView: {
    borderWidth: 2,
    borderColor: "gray",
    padding: 5,
    borderRadius: 5,
    marginBottom: 4,
    fontSize: 14,
  },
  buttonView: {
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
});
