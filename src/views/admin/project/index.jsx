import {Router, Route} from "react-router-dom"
// Chakra imports
import tableDataDevelopment from "./variables/tableDataDevelopment.json";
import DevelopmentTable from "./components/DevelopmentTable";

import {
  columnsDataDevelopment,
} from "./variables/columnsData";
import {
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import React from "react";
import CalendarProject from "../calendarproject/index"

console.log(CalendarProject)
export default function Settings() {
  // Lọc ra những dự án có thuộc tính ondelete bằng 0
  const filteredData = tableDataDevelopment.filter((project) => project.ondelete === 0);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}
        height="80vh" 
        width="320vh"
      >
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={filteredData} // Truyền dữ liệu đã được lọc
          height="100%" 
          width="100%"
        />
      </SimpleGrid>
      
    </Box>



  );
}
