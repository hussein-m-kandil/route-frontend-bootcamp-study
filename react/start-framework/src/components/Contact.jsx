import { useEffect, useState } from 'react';
import PageHeader from './PageHeader';

function FloatingLabelInput({ id, labelText, ...props }) {
  return (
    <div className="form-floating mb-3">
      <input
        className="form-control border-top-0 border-start-0 border-end-0"
        id={id}
        {...props}
        autoComplete="on"
      />
      <label htmlFor={id}>{labelText}</label>
    </div>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Contact';
  }, []);

  return (
    <>
      <PageHeader headText="Contact Component" />
      {submitted ? (
        <h4 className="fs-2 mt-5">
          <span className="fst-italic">{`Thank You `}</span>💙
        </h4>
      ) : (
        <form
          onSubmit={(e) => (e.preventDefault(), setSubmitted(true))}
          className="p-2 mx-auto text-start"
          style={{ maxWidth: '500px' }}
        >
          <FloatingLabelInput
            type="text"
            id="name"
            placeholder="Hussein Kandil"
            labelText="Name"
          />
          <FloatingLabelInput
            type="tel"
            id="age"
            placeholder="32"
            labelText="Age"
          />
          <FloatingLabelInput
            type="email"
            id="email"
            placeholder="name@example.com"
            labelText="Email"
          />
          <FloatingLabelInput
            type="password"
            id="password"
            placeholder="Password"
            labelText="Password"
          />
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      )}
    </>
  );
}

export default Contact;
