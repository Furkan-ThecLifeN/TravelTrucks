import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import styles from '../styles/BookingForm.module.css';

const BookingForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      date: '',
      comment: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      date: Yup.date().required('Booking date is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      toast.success('Reservation sent successfully!');
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <div>
        <input
            name="name"
            placeholder="Name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className={styles.input}
        />
        {formik.touched.name && formik.errors.name ? (
            <div className={styles.error}>{formik.errors.name}</div>
        ) : null}
      </div>

      <div>
        <input
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className={styles.input}
        />
        {formik.touched.email && formik.errors.email ? (
            <div className={styles.error}>{formik.errors.email}</div>
        ) : null}
      </div>

      <div>
        <input
            name="date"
            type="date"
            onChange={formik.handleChange}
            value={formik.values.date}
            className={styles.input}
            placeholder="Booking Date" 
        />
        {formik.touched.date && formik.errors.date ? (
            <div className={styles.error}>{formik.errors.date}</div>
        ) : null}
      </div>
      
      <textarea
        name="comment"
        placeholder="Comment"
        rows="4"
        onChange={formik.handleChange}
        value={formik.values.comment}
        className={styles.textarea}
      />

      <button type="submit" className={styles.submitBtn}>
        Send
      </button>
    </form>
  );
};

export default BookingForm;