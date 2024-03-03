'use client'

import { extendTheme, ChakraProvider, Flex, Box } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { db, bucket } from "../firebase";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import ResponsiveFormContainer from "@/components/ResponsiveFormContainer";
import CandidateProfile from "@/components/CandidateProfile";
import HeaderBanner from "@/components/HeaderBanner";
import RecruitmentInfo from "@/components/RecruitmentInfo";

const theme = extendTheme({
  colors: {
    "purple": {
      "50": "#EFECF9",
      "100": "#D2C9EE",
      "200": "#B4A6E3",
      "300": "#9783D8",
      "400": "#7A60CD",
      "500": "#5D3DC2",
      "600": "#4A319B",
      "700": "#382574",
      "800": "#25184E",
      "900": "#130C27"
    },
    "red": {
      "50": "#FCE8EB",
      "100": "#F8BFC7",
      "200": "#F395A3",
      "300": "#EF6C7F",
      "400": "#EA435C",
      "500": "#E61938",
      "600": "#B8142D",
      "700": "#8A0F21",
      "800": "#5C0A16",
      "900": "#2E050B"
    }
  },
})

export default function Page(props) {
  let [candidate, setCandidate] = useState(null)

  useEffect(() => {
      let fetchDoc = async () => {
        try {
          // Create a reference to the document
          const docRef = doc(db, "candidates", decodeURIComponent(props.params.candidateId));
          
          // Fetch the document
          const docSnap = await getDoc(docRef);
      
          // Check if the document exists
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setCandidate(docSnap.data()); // Returns the document data
          } else {
            // Doc not found
            console.log("No such document!");
            return null;
          }
        } catch (error) {
          console.error("Error fetching document: ", error);
          throw error; // Rethrow or handle error appropriately
        }
      }
      fetchDoc()
    }, [])

  return (
    <ChakraProvider theme={theme}>
      <HeaderBanner />
      <ResponsiveFormContainer>
        {candidate ? <Flex direction={{ base: "column", lg: "row" }} gap={4} marginTop="25px">
          <Box flex="1">
            <CandidateProfile candidate={candidate}/> 
          </Box>
          <Box flex="1">
            <RecruitmentInfo candidate={candidate}/>
          </Box>
        </Flex> : <></>}
      </ResponsiveFormContainer>
    </ChakraProvider>
  );
}