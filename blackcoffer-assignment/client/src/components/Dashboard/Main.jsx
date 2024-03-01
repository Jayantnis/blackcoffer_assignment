import React, { useState, useEffect } from "react";
import axios from "axios";
import IntensityChart from "./IntensityChart";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import Navbar from "./Navbar";
import RegionChart from "./RegionChart";
import { ChakraProvider, Flex, Box, Grid } from "@chakra-ui/react";
import RelevanceBubbleChart from "./Relevance";
import TopicsRadarChart from "./TopicChart";
import PieChart from "./SectorChart";
import CountryChart from "./Country";
import LikelihoodRadarChart from "./LikelihoodChart";
import EChartsComponent from "./EChartsComponent";
Chart.register(CategoryScale);

const Main = () => {
  const [data, setData] = useState([]);

  const getFetch = async () => {
    const response = await fetch('http://localhost:5000/api/data', {
      method: 'GET',
    })
    const data = await response.json();
    setData(data);
  }

  useEffect(() => {
    getFetch();
  }, []);


  return (

    <ChakraProvider>

      <Navbar />
      <div className=" col-xl-12 pt-10">


        <Flex direction={{ base: "column", md: "row" }} m={50}>

          <Box
            flex={{ base: "1", md: "0.5" }}
            maxW="50%"
            p={5}
            m={2}
            boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
            borderRadius={20}
          >
            <RegionChart data={data} />
          </Box>
          <Box
            flex={{ base: "1", md: "0.5" }}
            maxW="50%"
            p={5}
            m={2}
            boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
            borderRadius={20}
          >
            <TopicsRadarChart data={data} />
          </Box>
        </Flex>
        <RelevanceBubbleChart data={data} />
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
          <Box>
            <IntensityChart data={data} />
          </Box>
          <Box>
            <EChartsComponent data={data} />
          </Box>

          <Box>
            <PieChart data={data} />
          </Box>
          <Box>
            <LikelihoodRadarChart data={data} />
          </Box>
        </Grid>
        <CountryChart data={data} />
      </div>
    </ChakraProvider>
  );
};

export default Main;
