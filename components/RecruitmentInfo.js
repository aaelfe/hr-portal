import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Textarea,
    useToast,
    Select,
    Heading,
  } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { DatePickerField } from './DatePickerField';
import { validateFirstName } from '@/lib/CandidateValidation';
import { Stages } from '@/lib/MockData';
import { useState } from 'react';
import { db, bucket } from '@/app/firebase';
import { collection, doc, setDoc, get, deleteDoc} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
//import PDFViewer from './PdfViewer';
var Sentiment = require('sentiment');
import { useEffect } from 'react';
import Link from 'next/link';
    
  function RecruitmentInfo({ candidate }) {
    const toast = useToast();
    const [resumeUrl, setResumeUrl] = useState('');
    const [stage, setStage] = useState(candidate.stage);
    const [sentiment, setSentiment] = useState(0)

    const fileRef = ref(bucket, candidate.resumePath);
    getDownloadURL(fileRef)
        .then((url) => {
            setResumeUrl(url)
        })
        .catch((error) => {
            // Handle any errors
            console.error("Error loading resume:", error);
        });

    let deleteCandidate = () => {
      deleteDoc(doc(db, "candidates", candidate.email)).then(() => {
        toast({
          title: "Candidate deleted",
          description: "Please navigate back to the home page",
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    }
  
    let OnSubmit = async (values, actions) =>{
      setTimeout(async () => {
        const docRef = doc(db, "candidates", candidate.email.trim());
        try {
  
          if (false) { //Disabled
            toast({
              title: "Oops!",
              description: "Sorry, we already have a talent profile under that email.",
              status: 'error',
              duration: 9000,
              isClosable: true,
            });
          } else {
            await setDoc(docRef, {
              ...values,
              "stage": stage,
              "firstName": candidate.firstName,
              "lastName": candidate.lastName,
              "email": candidate.email,
              "phone": candidate.phone,
              "linkedin": candidate.linkedin,
              "resumePath": candidate.resumePath,
              "university": candidate.university,
              "graduationDate": new Date(candidate.graduationDate/1000),
              "positionType": candidate.positionType,
              "preferredLocation": candidate.preferredLocation,
              "coverLetter": candidate.coverLetter
            });
            toast({
              title: "You've updated this candidate's recruitment info!",
              description: "",
              status: 'success',
              duration: 9000,
              isClosable: true,
            });
          }
        } catch (e) {
          console.log(e)
          toast({
            title: "Oops!",
            description: "Sorry, there was an issue submitting this information. Please try again.",
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        }
        actions.setSubmitting(false);
      }, 1000);
    }

    let analyzeSentiment = (text) => {
      let sentiment = new Sentiment();
      setSentiment(sentiment.analyze(candidate.coverLetter));
    }

    useEffect(analyzeSentiment, [])
  
    return (
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" marginTop="75px">
        <Heading marginBottom="25px">Resume</Heading>
        <Link href='resumeUrl'>Open in new tab</Link>
        <Heading marginBottom="25px" marginTop="25px">Recruitment Info</Heading>
        <Formik
          initialValues={{
            feedback: candidate.feedback
          }}
          onSubmit={OnSubmit}
        >
          {({ errors, touched, isValidating, isSubmitting }) => (
            <Form>
              <VStack spacing={4} align="flex-start">
                <FormControl isRequired>
                  <FormLabel htmlFor="feedback">Feedback</FormLabel>
                  <Field as={Textarea} id="feedback" name="feedback" type="text" variant="outline"/>
                </FormControl>
  
                <FormControl isRequired>
                  <FormLabel htmlFor="stage">What stage is this candidate at?</FormLabel>
                  <Select
                    id="stage"
                    placeholder="N/A"
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                  >
                    {Stages.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </Select>
                </FormControl>

                <FormLabel>AI Generated Culture Fit Score</FormLabel>
                <Heading>{sentiment.score}</Heading>
  
                <Button
                  mt={4}
                  colorScheme="red"
                  type="delete"
                  onClick = {deleteCandidate}
                >
                  Delete
                </Button>

                <Button
                  mt={4}
                  colorScheme="purple"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Update
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    );
  
  }
  
  export default RecruitmentInfo;