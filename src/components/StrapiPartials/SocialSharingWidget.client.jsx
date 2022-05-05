import {useEffect,useState} from 'react'
const SocialSharingWidget = ({title}) => {
    const [href, setHref] = useState(null)
    useEffect(() => {
        // Client-side-only code
        setHref(window.location.href)
    })
    return (
        <div className={'social-sharing-wdget items-center sticky inline-flex z-10'}>
            <h5 className={'font-light'}>Share the Article</h5>
            <div className={'sm-icons flex'}>
              <a target='_blank' href={`https://www.facebook.com/sharer/sharer.php?u=${href}`}>
                <FacebookIcon />
              </a>
              <a target='_blank' href={`https://twitter.com/intent/tweet?text=${href}`}>
                <TwitterIcon />
              </a>
              <a target='_blank' href={`mailto:?subject=Black Fashion Fair:${title}&amp;body=Check out this site ${href}`}
                title="Share by Email">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-20 mail-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
              </a>
             
            </div>
        </div>
    )
}
function TwitterIcon() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 1000 1000">
        <path d="M990 195.8c-36.1 16-74.8 26.8-115.5 31.8C916 202.7 948 163.2 963 116.3c-38.8 23.1-81.8 39.9-127.7 48.8-36.8-39.2-89.3-63.8-146.8-63.8-111.1 0-201 90.1-201 201.2 0 15.8 1.7 31.2 5.2 45.9C325.5 340.1 177 259.9 77.9 138c-17.2 29.7-27.2 64.4-27.2 101.1 0 69.8 35.5 131.5 89.5 167.6-32.8-.8-64-10-91-25.1v2.5c0 97.6 69.4 178.8 161.4 197.3-16.8 4.6-34.7 7.1-53 7.1-12.9 0-25.5-1.2-37.8-3.7 25.5 80 99.9 138.1 187.9 139.8-68.7 54-155.5 86.2-249.8 86.2-16.2 0-32.2-1-48-2.9 88.7 57.7 194.4 91 307.8 91 370.1 0 572.6-306.7 572.6-572.8 0-8.7-.2-17.4-.6-26 39-28.5 73.3-63.8 100.3-104.3zM870 273l-14.5 10.6.8 17.9c.4 7.9.6 16.2.6 24.5 0 62.7-12.3 128.3-35.3 190-24.3 64.8-59.2 123.4-103.8 174-47.8 54.2-104.3 96.6-168.4 126.3-70.2 32.6-148.1 49-231.6 49-60 0-119.2-10-175.5-29.5 20.6-3.9 40.7-9.6 60.4-16.4 45.1-15.8 87-38.8 124.8-68.5l73.3-57.5-93.2-1.7c-54.2-1-103.2-27.8-133.5-70.4 15.2-1 30.1-3.7 44.6-7.7l126.1-42L216.6 549C155.2 536.8 107 491.1 89.3 433.1c16.2 4.2 32 5.8 49.6 6.9 0 0 66 2.9 115.9-.2-27-12.9-96.4-60.6-96.4-60.6-46.7-31.4-74.8-83.5-74.8-140 0-13.3 1.7-26.6 4.6-39.5 45.5 46.5 97.6 85.4 156 115.3 76.8 39.7 159.7 61.9 246.3 66.2l44 2.3-10-43c-2.9-12.3-4.4-25.1-4.4-38.4 0-92.2 75.4-167.6 168-167.6 46.3 0 91 19.3 122.5 53.2l12.7 13.5 18.1-3.5c9.3-1.9 18.5-3.9 27.6-6.4-2.1 2.9-11.8 12.7-22.8 22.4-9.3 8.3-37 34.3-37 34.3s27 8.5 43.8 10.4c16.8 1.9 36.1-1.2 39.3-1.7-5.7 4.7-16.1 12-22.3 16.3z"></path>
      </svg>
    );
  }
  
  
  function FacebookIcon() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 1000 1000">
        <path d="M581.7 336.7v-97.2c0-43.9 9.7-66.1 77.8-66.1H745V10H602.3c-174.8 0-232.5 80.1-232.5 217.7v109H255V500h114.8v490h211.8V500h143.9L745 336.7H581.7zm107.7 122.5H540.9v490H410.7V459.1H295.9v-81.7h114.8V227.7c0-62.5 13.8-105.1 39.6-132.2 28.6-30.6 79.4-44.7 152.1-44.7h101.8v81.7h-44.7c-30.6 0-70.2 2.8-94.7 29.9-20.7 23-24 51.3-24 76.8v138.4H699l-9.6 81.6z"></path>
      </svg>
    );
  }
  
  
export default SocialSharingWidget