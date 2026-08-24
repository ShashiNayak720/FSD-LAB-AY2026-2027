function Contact() {
    return (
        <div className="page">
            <h1>Contact Us</h1>
            <p>📧 Email: info@ferrari.com</p>
            <p>📞 Phone: +91 98765 43210</p>
            <p>📍 Location: Hyderabad, India</p>

            <input placeholder="Your Name" />
            <input placeholder="Your Email" />
            <textarea placeholder="Your Message"></textarea>
            <button>Send Message</button>
        </div>
    );
}

export default Contact;