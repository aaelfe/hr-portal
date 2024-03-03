import React, { useState } from 'react';
import Link from 'next/link';
import { Box, Input, Button, Table, Thead, Tbody, Tr, Th, Td, chakra, VStack, Text } from '@chakra-ui/react';
import { db } from '@/app/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { format } from 'date-fns';

// const candidates = [
//   { id: 1, name: 'John Doe', position: 'Frontend Developer', experience: '3 years', status: 'Interviewed' },
//   { id: 2, name: 'Jane Smith', position: 'Backend Developer', experience: '5 years', status: 'Hired' },
//   { id: 3, name: 'William Johnson', position: 'UI/UX Designer', experience: '2 years', status: 'Applied' },
//   { id: 4, name: 'Emma Brown', position: 'Project Manager', experience: '4 years', status: 'Rejected' },
// ];

let getBadgeColor = (val) => {
    switch(val){
        case 'Hired!': 'green.500' 
        case 'Offer': 'green.500' 
        case 'N/A': 'red.500'
        case '1st Interview': 'yellow.500'
        case '2nd Interview': 'orange.500'
        default: 'purple.500'
    }
}

let getBgBadgeColor = (val) => {
    switch(val){
        case 'Hired!': 'green.100' 
        case 'Offer': 'green.100' 
        case 'N/A': 'red.100'
        case '1st Interview': 'yellow.100'
        case '2nd Interview': 'orange.100'
    }
}

export const CandidateTable = () => {
    const [candidates, setCandidates] = useState([]);
    const [search, setSearch] = useState('');

    React.useEffect(() => {
        let getSnapshot = async () => {
            const q = collection(db, "candidates")
            const querySnapshot = await getDocs(q)
            let c = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setCandidates(c)
        }

        getSnapshot()
    }, [])

    const filteredCandidates = candidates.filter(candidate =>
        (candidate.firstName.toLowerCase() + " " + candidate.lastName.toLowerCase()).includes(search.toLowerCase()) ||
        candidate.preferredLocation.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <VStack w="full" p={4} spacing={4} marginTop="90px">
            <Input
                placeholder='Search by name or preferred location...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Box overflowX="auto">
                <Table variant='simple'>
                <Thead>
                    <Tr>
                    <Th>Name</Th>
                    <Th>School</Th>
                    <Th>Graduation Date</Th>
                    <Th>Position</Th>
                    <Th>Location</Th>
                    <Th>Status</Th>
                    <Th>Feedback</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {filteredCandidates.map(candidate => (
                    <Tr key={candidate.id}>
                        <Link href={candidate.id} passHref>
                            <Td>{candidate.firstName + " " + candidate.lastName}</Td>
                        </Link>
                        <Td>{candidate.university}</Td>
                        <Td>{format(candidate.graduationDate.seconds*1000, "MM/yy")}</Td>
                        <Td>{candidate.positionType}</Td>
                        <Td>{candidate.preferredLocation}</Td>
                        <Td>
                        <chakra.span
                            px={2}
                            py={1}
                            rounded="full"
                            color={getBadgeColor(candidate.stage)}
                            bg={getBgBadgeColor(candidate.stage)}
                        >
                            {candidate.stage}
                        </chakra.span>
                        </Td>
                        <Td>{candidate.feedback}</Td>
                    </Tr>
                    ))}
                    {filteredCandidates.length === 0 && (
                    <Tr>
                        <Td colSpan={4}>
                        <Text textAlign="center" py={2}>No candidates found.</Text>
                        </Td>
                    </Tr>
                    )}
                </Tbody>
                </Table>
            </Box>
        </VStack>
    );
};

export default CandidateTable;