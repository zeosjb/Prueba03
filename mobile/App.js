import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { PaperProvider, Card, Text } from 'react-native-paper';
import axios from 'axios';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        alert('Error fetching posts:', error);
      });

    axios.get('http://localhost:3000/comments')
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        alert('Error fetching comments:', error);
      });
  }, []);

  const getCommentsForPost = (postId) => {
    return comments.filter(comment => comment.postId === postId);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.textView}>List of Posts</Text>
        {posts.map(post => (
          <Card key={post.id} style={styles.cardView}>
            <Card.Cover source={post.image} />
            <Card.Title
              title={post.title}
              subtitle={`Author: ${post.author}`}
            />
            <Card.Content>
              {getCommentsForPost(post.id).map(comment => (
                <Text key={comment.id}>{comment.body}</Text>
              ))}
            </Card.Content>
          </Card>
        ))}
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardView: {
    width: '95%',
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  textView: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 0,
  },
});
