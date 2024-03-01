import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Box,
  Flex,
  Heading,
  Select,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react";

const CountryChart = ({ data }) => {
  const { colorMode } = useColorMode();
  const [selectedCountry, setSelectedCountry] = useState(
    "United States of America"
  );
  const [chartData, setChartData] = useState(null);

  const [selectedRegion, setSelectedRegion] = useState("India"); // State for selected region
  const [regionOptions, setRegionOptions] = useState([]); // State for region options

  useEffect(() => {
    const countryData = data.filter(
      (entry) => entry.country === selectedCountry
    );
    const regions = [...new Set(data.map(item => item.region))];
    setRegionOptions(regions);


    const countryRegions = data.filter(
      (entry) => entry.region === selectedRegion
    );

    const sectors = {};
    countryData.forEach((entry) => {
      if (!sectors[entry.sector]) {
        sectors[entry.sector] = [];
      }
      sectors[entry.sector].push(entry.intensity);
    });

    const sectorLabels = Object.keys(sectors);
    const sectorIntensities = sectorLabels.map(
      (sector) => sectors[sector]
    );


    countryRegions.forEach((entry) => {
      if (!sectors[entry.sector]) {
        sectors[entry.sector] = [];
      }
      sectors[entry.sector].push(entry.intensity);
    });


    const chartBackgroundColor =
      colorMode === "light"
        ? "rgba(79, 59, 169, 0.7)"
        : "rgba(144, 104, 190, 0.7)";

    setChartData({
      labels: sectorLabels,
      datasets: [
        {
          label: "Intensity",
          data: sectorIntensities,
          backgroundColor: chartBackgroundColor,
        },
      ],
    });
  }, [selectedCountry, selectedRegion, data, colorMode]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        grid: {
          color: colorMode === "light" ? "gray.200" : "gray.900",
        },
      },
    },
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };
  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value); // Update selected region
  };

  return (
    <Box p={6} shadow="md" bg={useColorModeValue("white", "gray.800")} m={50}>
      <Flex direction="column" margin={'auto'}>
        <Heading as={"h2"} textAlign="left" mb={4} style={{ textAlign: "left" }} >
          Country Chart
        </Heading>
        <Select
          value={selectedCountry}
          onChange={handleCountryChange}
          mb={4}
          w="200px"
          colorScheme="purple"
        >
          <option value="United States of America">
            United States of America
          </option>
          <option value="Mexico">Mexico</option>
          <option value="Nigeria">Nigeria</option>
          <option value="Lebanon">Lebanon</option>
          <option value="Russia">Russia</option>
          <option value="Saudi Arabia">Saudi Arabia</option>
        </Select>
        <Heading as={"h2"} textAlign="left" mb={4} style={{ textAlign: "left" }} >
          Region Chart
        </Heading>
        <Select
          value={selectedRegion}
          onChange={handleRegionChange}
          mb={4}
          w="200px"
          colorScheme="purple"
        >
          {regionOptions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </Select>
        <Box height="500px" width={"100%"} overflowX="auto">
          {chartData && <Bar data={chartData} options={chartOptions} />}
        </Box>
      </Flex>
    </Box>
  );
};

export default CountryChart;
