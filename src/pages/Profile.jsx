import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Heading, Text, VStack, Button, Input, Stack } from "@chakra-ui/react";
import { client } from "../../lib/crud";

const developers = [
  { id: 1, name: "John Doe", location: "New York, USA", technologies: ["React", "Node.js"] },
  { id: 2, name: "Jane Smith", location: "Berlin, Germany", technologies: [".NET", "Go"] },
  { id: 3, name: "Carlos Ruiz", location: "Madrid, Spain", technologies: ["JavaScript", "React"] },
  { id: 4, name: "Aisha Mohammed", location: "Lagos, Nigeria", technologies: ["Node.js", "Go"] },
];

const Profile = () => {
  const { id } = useParams();
  const developer = developers.find((dev) => dev.id.toString() === id);

  if (!developer) {
    return (
      <Container>
        <Text>No developer found.</Text>
      </Container>
    );
  }

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchMessages() {
      const fetchedMessages = await client.getWithPrefix(`message:${id}`);
      if (fetchedMessages) {
        setMessages(fetchedMessages.map((msg) => msg.value));
      }
    }
    fetchMessages();
  }, [id]);

  const [editingMessage, setEditingMessage] = useState(null);

  const sendMessage = async () => {
    const timestamp = editingMessage ? editingMessage.timestamp : new Date().toISOString();
    const newMessage = { sender: "currentUser", recipientId: parseInt(id), message, timestamp };
    const method = editingMessage ? "update" : "set";
    const success = await client[method](`message:${id}:${timestamp}`, newMessage);
    if (success) {
      if (editingMessage) {
        setMessages(messages.map((m) => (m.timestamp === timestamp ? newMessage : m)));
      } else {
        setMessages([...messages, newMessage]);
      }
      setMessage("");
      setEditingMessage(null);
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4} align="stretch">
        <Heading as="h2" size="lg">
          {developer.name}
        </Heading>
        <Text>{developer.location}</Text>
        <VStack>
          {developer.technologies.map((tech) => (
            <Text key={tech}>{tech}</Text>
          ))}
        </VStack>
        <Input placeholder="Type your message here..." value={message} onChange={(e) => setMessage(e.target.value)} />
        <Button colorScheme="blue" onClick={sendMessage}>
          Send Message
        </Button>
        <Stack spacing={2}>
          {messages.map((msg, index) => {
            const handleDelete = async () => {
              const success = await client.delete(`message:${id}:${msg.timestamp}`);
              if (success) {
                setMessages(messages.filter((m) => m.timestamp !== msg.timestamp));
              }
            };

            const handleEdit = () => {
              setMessage(msg.message);
              setEditingMessage(msg);
            };

            return (
              <Box key={index} p={3} shadow="md" borderWidth="1px">
                <Text>{msg.message}</Text>
                <Text fontSize="sm">Sent on {new Date(msg.timestamp).toLocaleString()}</Text>
                <Button colorScheme="red" size="sm" onClick={handleDelete}>
                  Delete
                </Button>
                <Button colorScheme="blue" size="sm" onClick={handleEdit}>
                  Edit
                </Button>
              </Box>
            );
          })}
        </Stack>
      </VStack>
    </Container>
  );
};

export default Profile;
