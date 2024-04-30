import React from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Heading, Text, VStack, Button } from "@chakra-ui/react";

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
        <Button colorScheme="blue">Send Message</Button>
      </VStack>
    </Container>
  );
};

export default Profile;
