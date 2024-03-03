'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import CandidateTable from "@/components/CandidateTable";
import HeaderBanner from "@/components/HeaderBanner";
import ResponsiveFormContainer from "@/components/ResponsiveFormContainer";

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
    },
    "yellow": {
      "50": "#FBF5EA",
      "100": "#F3E3C3",
      "200": "#ECD29D",
      "300": "#E4C077",
      "400": "#DDAE50",
      "500": "#D59D2A",
      "600": "#AA7D22",
      "700": "#805E19",
      "800": "#553F11",
      "900": "#2B1F08"
    },
    "orange": {
      "50": "#FCF1E9",
      "100": "#F5D6C1",
      "200": "#EFBC9A",
      "300": "#E9A272",
      "400": "#E3884A",
      "500": "#DD6E22",
      "600": "#B0581C",
      "700": "#844215",
      "800": "#582C0E",
      "900": "#2C1607"
    }
  },
})

export default function Home() {
  return (
    <ChakraProvider theme={theme}>
      <HeaderBanner />
      <ResponsiveFormContainer>
        <CandidateTable />
      </ResponsiveFormContainer>
    </ChakraProvider>
  );
}
