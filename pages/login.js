import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { API } from "aws-amplify";
import { DataStore } from 'aws-amplify';
const InquirySchema = yup.object().shape({
  ParentName: yup.string().required('Parent Name is required'),
  StudentName: yup.string().required('Student Name is required'),
  PhoneNumber: yup.string(), // You may add validation for phone number format
  Email: yup.string().email('Invalid email').required('Email is required'),
  Grade: yup.string().required('Grade is required'),
  Topic: yup.string(),
  Info: yup.string(),
});

const InquiryFormWithSubmit = () => {
  const onSubmit = async (values) => {
    try {
      const newInquiry = await API.graphql(graphqlOperation(createInquiry, { input: values }));
      console.log('New Inquiry created:', newInquiry);
    } catch (error) {
      console.error('Error creating Inquiry:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik
        initialValues={{
          ParentName: '',
          StudentName: '',
          PhoneNumber: '',
          Email: '',
          Grade: '',
          Topic: '',
          Info: '',
        }}
        validationSchema={InquirySchema}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <View style={styles.form}>
            <Text>Parent Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('ParentName')}
              value={values.ParentName}
            />
            {touched.ParentName && errors.ParentName && (
              <Text style={styles.errorText}>{errors.ParentName}</Text>
            )}

            <Text>Student Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('StudentName')}
              value={values.StudentName}
            />
            {touched.StudentName && errors.StudentName && (
              <Text style={styles.errorText}>{errors.StudentName}</Text>
            )}

            <Text>Phone Number</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('PhoneNumber')}
              value={values.PhoneNumber}
            />

            <Text>Email</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('Email')}
              value={values.Email}
            />
            {touched.Email && errors.Email && (
              <Text style={styles.errorText}>{errors.Email}</Text>
            )}

            <Text>Grade</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('Grade')}
              value={values.Grade}
            />
            {touched.Grade && errors.Grade && (
              <Text style={styles.errorText}>{errors.Grade}</Text>
            )}

            <Text>Topic</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('Topic')}
              value={values.Topic}
            />

            <Text>Info</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('Info')}
              value={values.Info}
            />

            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '80%',
    padding: 16,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
  },
});

export default InquiryFormWithSubmit;
