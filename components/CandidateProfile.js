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
  import { CollegesAndUniversities, PositionType } from '@/lib/MockData';
  import { useEffect, useState } from 'react';
  import { db, bucket } from '@/app/firebase';
  import { collection, doc, setDoc, get } from "firebase/firestore";
  import { ref, uploadBytes } from "firebase/storage";
    
  function CandidateProfile({ candidate }) {
    const toast = useToast();
    const [university, setUniversity] = useState('');
    const [positionType, setPositionType] = useState('');
    const [resume, setResume] = useState(null);

    useEffect(() => {
        setPositionType(candidate.positionType)
    }, [])

    console.log(positionType)
  
    let OnSubmit = async (values, actions) =>{
      setTimeout(async () => {
        const docRef = doc(db, "candidates", values.email.trim());
        if(resume) storageRef = ref(bucket, 'resumes/' + values.email.trim() + '/' + resume.name);
        
        try {
          //const docSnapshot = await docRef.get();
  
        
          // Upload the file to Firebase Storage
          if(resume) {
            uploadResult = await uploadBytes(storageRef, resume);
            console.log('Uploaded a blob or file!', uploadResult);
          }
  
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
              positionType: positionType ? positionType : candidate.positionType, // Add this from state
              graduationDate: new Date(values.graduationDate),
              resumePath: resume ? uploadResult.metadata.fullPath : candidate.resumePath
            });
            toast({
              title: "You've updated this candidate profile!",
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
  
    return (
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" marginTop="75px">
        <Heading marginBottom="25px">Candidate Profile</Heading>
        <Formik
          initialValues={{
            firstName: candidate.firstName,
            lastName: candidate.lastName,
            email: candidate.email,
            phone: candidate.phone,
            linkedin: candidate.linkedin,
            resume: [],
            university: candidate.university,
            graduationDate: candidate.graduationDate.seconds * 1000,
            preferredLocation: candidate.preferredLocation,
            coverLetter: candidate.coverLetter,
          }}
          onSubmit={OnSubmit}
        >
          {({ errors, touched, isValidating, isSubmitting }) => (
            <Form>
              <VStack spacing={4} align="flex-start">
                <FormControl isRequired>
                  <FormLabel htmlFor="firstName">First Name</FormLabel>
                  <Field as={Input} validate={validateFirstName} id="firstName" name="firstName" type="text" variant="outline"/>
                  {errors.firstName && touched.firstName && <div>{errors.firstName}</div>}
                </FormControl>
  
                <FormControl isRequired>
                  <FormLabel htmlFor="lastName">Last Name</FormLabel>
                  <Field as={Input} id="lastName" name="lastName" type="text" variant="outline" />
                </FormControl>
  
                <FormControl isRequired>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <Field as={Input} id="email" name="email" type="email" variant="outline" />
                </FormControl>
  
                <FormControl isRequired>
                  <FormLabel htmlFor="phone">Phone Number</FormLabel>
                  <Field as={Input} id="phone" name="phone" type="phone" variant="outline" />
                </FormControl>
  
                <FormControl isRequired>
                  <FormLabel htmlFor="linkedin">LinkedIn Profile</FormLabel>
                  <Field as={Input} id="linkedin" name="linkedin" type="linkedin" variant="outline" />
                </FormControl>
  
                <FormControl>
                  <FormLabel htmlFor="resume">Resume</FormLabel>
                  <Input
                    id='file-upload'
                    type='file'
                    variant='outline'
                    p={1}
                    accept='.pdf,.doc,.docx' // Specify accepted file types
                    onChange={(e) => setResume(e.target.files[0])}
                  />
                </FormControl>
  
                <FormControl isRequired>
                    <FormLabel htmlFor="university">College/University</FormLabel>
                    <Field as={Input} id="university" name="university" type="text" variant="outline" />
                </FormControl>
  
                <FormControl isRequired>
                  <FormLabel htmlFor="graduationDate">Graduation Date (Estimate is fine)</FormLabel>
                  <DatePickerField name="graduationDate" label="Select a date" />
                </FormControl>
  
                <FormControl isRequired>
                  <FormLabel htmlFor="positionType">What type of position are you interested in?</FormLabel>
                  <Select
                    value={positionType}
                    id="positionType"
                    placeholder="Select Item"
                    onChange={(e) => setPositionType(e.target.value)}
                  >
                    {PositionType.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </Select>
                </FormControl>
  
                <FormControl isRequired>
                  <FormLabel htmlFor="preferredLocation">Preferred Location</FormLabel>
                  <Field as={Input} id="preferredLocation" name="preferredLocation" type="text" variant="outline" />
                </FormControl>
  
                <FormControl>
                  <FormLabel htmlFor="coverLetter">Why they want to be in this role</FormLabel>
                  <Field as={Textarea} id="coverLetter" name="coverLetter" variant="outline" />
                </FormControl>
  
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
  
  export default CandidateProfile;