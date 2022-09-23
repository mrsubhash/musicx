import { Box, Flex, Text } from "@chakra-ui/layout";
import { Button, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { auth } from "../lib/mutations";
import NextImage from "next/image";

const AuthForm: FC<{ mode: "signin" | "signup" }> = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const user = await auth(mode, { email, password });
    setIsLoading(false);
    router.push("/");
  };

  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex
        direction="column"
        justify="center"
        align="center"
        height="calc(100vh - 100px)"
      >
        <Flex justify="center" align="center">
          <NextImage
            src="/musicx-logos_white.png"
            height="130px"
            width="280px"
            objectFit="cover"
          />
        </Flex>
        <Box padding="50px" bg="gray.900" borderRadius="6px">
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              marginBottom="16px"
            />
            <Input
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              marginBottom="16px"
            />
            <Button
              type="submit"
              bg="green.500"
              isLoading={isLoading}
              sx={{
                "&:hover": {
                  bg: "green.300",
                },
              }}
              marginBottom="16px"
            >
              {mode}
            </Button>
            <Text fontSize="sm">
              *Demo credentials: Email - user@email.com ,Password - password
            </Text>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
