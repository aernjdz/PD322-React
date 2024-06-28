import React,{useState,useRef} from 'react'
const faqs = [
    {
        id: 1,
        header: "What is Lorem Ipsum?",
        text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`
    },
    {
        id: 2,
        header: "Where does it come from?",
        text: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. `
    },
    {
        id: 3,
        header: "Why do we use it?",
        text: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,`
    },
    {
        id: 4,
        header: "Where can I get some?",
        text: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.`
    }
]
const AccordionItem = ({ handleToggle, active, faq }) => {
    const contentEl = useRef();
    const { header, id, text } = faq;

    return (
        <div className="rc-accordion-card">
            <div className="rc-accordion-header">
                <div
                    className={`rc-accordion-toggle p-3 ${active.includes(id) ? 'active' : ''}`}
                    onClick={() => handleToggle(id)}
                >
                    <h5 className="rc-accordion-title">{header}</h5>
                    <i className="fa fa-solid fa-plus rc-accordion-icon"></i>

                </div>
            </div>
            <div
                ref={contentEl}
                className={`rc-collapse ${active.includes(id) ? 'show' : ''}`}
                style={
                    active.includes(id)
                        ? { height: contentEl.current.scrollHeight }
                        : { height: '0px' }
                }
            >
                <div className="rc-accordion-body">
                    <p className="mb-0">{text}</p>
                </div>
            </div>
        </div>
    );
};
const Accordion = () => {

    const [active, setActive] = useState([]);

    const handleToggle = (id) => {
        if (active.includes(id)) {
            setActive(active.filter((item) => item !== id));
        } else {
            setActive([...active, id]);
        }
    };

    return (
        <div className="container-fluid mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8 mt-2">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="form-heading mb-4 text-primary text-center mt-3">Accordion</h4>
                            {faqs.map((faq) => (
                                <AccordionItem
                                    key={faq.id}
                                    active={active}
                                    handleToggle={handleToggle}
                                    faq={faq}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accordion;