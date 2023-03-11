import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'


const FormFormik = () => {
    const initialValues = {
        task: '',
        description: '',
        priority: '',
     

    }

    const formSchema = Yup.object().shape(
        {
            task: Yup.string()
                .min(6, 'Task must be 6 characters')
                .max(12, 'Username exceeds 12 characters')
                .required('Task is required'),
            description: Yup.string()
                .min(6, 'Description must be 6 characters')
                .max(24, 'Description must be 24 characters'),
            priority: Yup.string()
                .oneOf(['urgent', 'blocking', 'normal'], 'Invalid priority')
                .required('Priority is required'),
        }
    )

  return (
    <div>
        <h4>Register Form</h4>
        <Formik initialValues={initialValues}  
                validationSchema={formSchema}
        onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 1000));
           alert(JSON.stringify(values, null, 2));
           // Data saved in the localstorage
           localStorage.setItem('credentials', values)
        }}>
         {({ values,
            errors, 
            touched, 
            isSubmitting,  
            handleChange, 
            handleBlur}) => (
               <Form>
                        <label htmlFor="task">Task</label>
                        <Field id="task" name="task" placeholder="Your task" />
                        {
                            errors.task && touched.task && (
                                <ErrorMessage name='task' component='div'></ErrorMessage>
                            )
                        }
                        <label htmlFor="description">Description</label>
                        <Field id="description" name="description" placeholder="Your description" />
                        {
                            errors.description&& touched.description && (
                                <ErrorMessage name='task' component='div'></ErrorMessage>
                            )
                        }
                            <Field name="priority" as="select">
                                <option value="">Select a priority</option>
                                <option value="urgent">Urgent</option>
                                <option value="blocking">Blocking</option>
                                <option value="normal">Normal</option>
                            </Field>
                        <button type="submit">Add Task</button>
                        {isSubmitting ? (<p>Sending your task...</p>) : null}
               </Form> 
            )
         }
        </Formik>
    </div>
  )
}

export default FormFormik