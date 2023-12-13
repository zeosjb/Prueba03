import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { PaperProvider, Avatar, Button, Card, Text } from "react-native-paper";



export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.textView}>List of Post</Text>
        <Card style={styles.cardView}>
          <Card.Title
            title="Card Title"
            subtitle="Card Subtitle"
          />
          <Card.Content>
            <Text variant="titleLarge">Card title</Text>
            <Text variant="bodyMedium">Card content</Text>
          </Card.Content>
          <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        </Card>
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cardView: {
    width: '100%',
  },
  textView: {
    color: 'black',
    fontSize: 18,
    fontVariant: 'bold',
    marginBottom: 10,
    marginTop: 0
  }
});
