import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import Login from "../Components/Authentication/Login";
import Signup from "../Components/Authentication/Signup";
import { ChatContext } from "../Context/ChatProvider";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user} = useContext(ChatContext);
  const userinfo = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();
  useEffect(() => {
    if (userinfo) {
      navigate("/chats");
    }
  }, [navigate]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        display={"flex"}
        justifyContent={"center"}
        p={3}
        w={"100%"}
        m={"40px 0 15px 0"}
        borderRadius={"lg"}
        borderWidth={"1px"}
        backgroundColor={"white"}
        fontFamily={"Work Sans"}
        fontSize={"25px"}
        color={"black"}>
        <Text>Talk-Chat</Text>
      </Box>
      <Box
        bg={"white"}
        w="100%"
        borderRadius={"lg"}
        borderWidth={"1px"}
        p={"4"}
        color={"black"}>
        <Tabs variant="soft-rounded" isFitted>
          <TabList mb={"1em"}>
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>Register</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
