import React, {useState, useEffect, useRef} from 'react';
// import './mcFormStyles.scss';
import MailchimpSubscribe from "react-mailchimp-subscribe"

export default function NewsletterClient({landingSection}) {
  return <CustomForm />
  if (landingSection) {
    return <LandingNewsletter />;
  } else {
    return <FooterNewsletter />;
  }
}
function LandingNewsletter() {
  return (
    <form action="https://blackfashionfair.us5.list-manage.com/subscribe/post"  className="uppercase font-semibold text-center pt-2 gutter " method="POST">
      <input type="hidden" name="u" value="04c73fe09984c5158e801e6d6" />
      <input type="hidden" name="id" value="801ef3824b" />
      <input
        type="email"
        autocapitalize="off" autocorrect="off" name="MERGE0" id="MERGE0"
        value=""
        className="placeholder-black focus:outline-none target:shadow-none block bg-transparent p-1 pl-0 border-b w-80  border-black	"
        placeholder="EMAIL"
      />
      <button type="submit" className="pt-4 font-semibold uppercase">
        Subscribe
      </button>
    </form>
  );
}
function FooterNewsletter() {
  const handleSubmit = (e) => {
    e.preventDefault();
    email &&
    email.indexOf("@") > -1 &&
    onValidated({
        MERGE0: email,
    });
  
  }
  return (
    <form action="https://blackfashionfair.us5.list-manage.com/subscribe/post-json" onSubmit={handleSubmit} className="uppercase font-sans pt-2" method="POST">
      <input type="hidden" name="u" value="04c73fe09984c5158e801e6d6" />
      <input type="hidden" name="id" value="801ef3824b" />
      <input
        type="email"
        autocapitalize="off" autocorrect="off" name="MERGE0" id="MERGE0"
        className="block bg-transparent p-1 pl-0 border-b w-64 border-black	"
        placeholder="EMAIL"
      />
      <button type="submit" className="pt-2 font-semibold uppercase">
        Subscribe
      </button>
    </form>
  );
}
const url = `https://blackfashionfair.us5.list-manage.com/subscribe/post?u=04c73fe09984c5158e801e6d6&id=801ef3824b`;

const SimpleForm = () => <MailchimpSubscribe  url={url}/>

const CustomForm = () => {
  // const entry = useRef(null);
  // useEffect(() => {
  //   if(entry.current){
  //    const email = document.querySelectorAll('.mailchimp-form input[type="email"');
  //     for (let i =0; i < email.length;i++)
  //       email[i].placeholder = 'EMAIL'
  //   }
  // }, [entry])

  return (
    <MailchimpSubscribe
      url={url}
      render={({ subscribe, status, message }) => (
        <div  className={'mailchimp-form'}>
          <RenderedForm status={status} message={message} onValidated={formData => subscribe(formData)} />
        </div>
      )}
    />
  )
}


const RenderedForm = ({ status, message, onValidated }) => {
  let email;
  const submit = () =>
    email &&
    email.value.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email.value,
    });
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log('do validate');
      submit();
    }
  }
  return (
    <div>
      <input
        ref={node => (email = node)}
        type="email"
        placeholder="EMAIL"
        onKeyDown={handleKeyDown}
      />
       <button onClick={submit}>
        Submit
      </button>
      {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
      {status === "error" && (
        <div
          style={{ color: "red" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
          style={{ color: "green" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      
      <br />
     
    </div>
  );
};

const useIsMounted = () =>  {
  // component is certainly mounted from the beginning
  const componentIsMounted = useRef(true)
  useEffect(() => {
  // when non-SSR + (ComponentDidMount or ComponentDidUpdate):
  // do nothing.
  // when non-SSR + ComponentWillUnmount:
    return () => { componentIsMounted.current = false }
  }, [])
  return componentIsMounted
}