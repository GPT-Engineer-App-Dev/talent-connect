import React, { useState } from "react";
import { Box, Container, Heading, Input, InputGroup, InputLeftElement, Stack, Tag, Text, Button, useToast, VStack, HStack, IconButton } from "@chakra-ui/react";
import { FaSearch, FaEnvelope } from "react-icons/fa";

const developers = [
  { id: 1, name: "John Doe", location: "New York, USA", technologies: ["React", "Node.js"] },
  { id: 2, name: "Jane Smith", location: "Berlin, Germany", technologies: [".NET", "Go"] },
  { id: 3, name: "Carlos Ruiz", location: "Madrid, Spain", technologies: ["JavaScript", "React"] },
  { id: 4, name: "Aisha Mohammed", location: "Lagos, Nigeria", technologies: ["Node.js", "Go"] },
];

const techColorScheme = {
  React: "teal",
  "Node.js": "green",
  ".NET": "purple",
  Go: "orange",
  JavaScript: "yellow",
};

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const toast = useToast();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredDevelopers = developers.filter((dev) => dev.name.toLowerCase().includes(searchTerm) || dev.technologies.some((tech) => tech.toLowerCase().includes(searchTerm)));

  const sendMessage = (name) => {
    toast({
      title: `Message sent to ${name}!`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8}>
        <Heading as="h1" size="xl">
          Particles Marketplace
        </Heading>
        <Text fontSize="lg">Discover and connect with top software talent specialized in web technologies like React, Node.js, .NET, Go, and JavaScript.</Text>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <FaSearch />
          </InputLeftElement>
          <Input placeholder="Search by name or technology..." onChange={handleSearchChange} />
        </InputGroup>
        <Stack spacing={4} align="stretch">
          {filteredDevelopers.map((dev) => (
            <Box key={dev.id} p={5} shadow="md" borderWidth="1px">
              <HStack justifyContent="space-between">
                <VStack align="start">
                  <Text fontWeight="bold">{dev.name}</Text>
                  <Text>{dev.location}</Text>
                  <HStack>
                    {dev.technologies.map((tech) => {
                      const colorScheme = techColorScheme[tech] || "gray";
                      return (
                        <Tag key={tech} size="sm" colorScheme={colorScheme}>
                          {tech}
                        </Tag>
                      );
                    })}
                  </HStack>
                </VStack>
              </HStack>
            </Box>
          ))}
        </Stack>
      </VStack>
    </Container>
  );
};

export default Index;
