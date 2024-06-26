import Button from "@/shared/ui/button";
import {
  Box,
  Card,
  CardBody,
  Center,
  Heading,
  Image,
  Stack,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";

const Library = () => {
  return (
    <Center h="100%">
      <Box w={1440} border="1px solid black">
        <Center mt="80px">
          <Button title="새 작업 시작하기" size="large" />
        </Center>

        <SimpleGrid mt="80px" columns={4} spacing={10}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_item) => (
            <CardComponent />
          ))}
        </SimpleGrid>
      </Box>
    </Center>
  );
};

export default Library;

const CardComponent = () => {
  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">Living room Sofa</Heading>
          <Stack justifyContent="space-between" direction={["row"]}>
            <Text color="blue.600" textStyle="smallText2">
              만료시간
            </Text>
            <Text color="blue.600" textStyle="smallText2">
              다운로드
            </Text>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};
