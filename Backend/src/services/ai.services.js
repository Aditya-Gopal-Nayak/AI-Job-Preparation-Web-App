const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const puppeteer = require("puppeteer");

// ===============================
// GEMINI CONFIGURATION
// ===============================

const apiKey = process.env.GOOGLE_GENAI_API_KEY;

console.log("Gemini API Key Loaded:", !!apiKey);

if (!apiKey) {
    console.error(
        "ERROR: GOOGLE_GENAI_API_KEY is missing from .env"
    );
}

const ai = new GoogleGenAI({
    apiKey: apiKey
});

// ===============================
// INTERVIEW REPORT ZOD SCHEMA
// Used only for validation
// ===============================

const interviewReportSchema = z.object({

    matchScore: z
        .number()
        .min(0)
        .max(100),

    technicalQuestions: z
        .array(
            z.object({
                question: z.string(),
                intention: z.string(),
                answer: z.string()
            })
        ),

    behavioralQuestions: z
        .array(
            z.object({
                question: z.string(),
                intention: z.string(),
                answer: z.string()
            })
        ),

    skillGaps: z
        .array(
            z.object({
                skill: z.string(),
                severity: z.enum([
                    "low",
                    "medium",
                    "high"
                ])
            })
        ),

    preparationPlan: z
        .array(
            z.object({
                day: z.number(),
                focus: z.string(),
                tasks: z.array(z.string())
            })
        ),

    title: z.string()
});


// ===============================
// INTERVIEW REPORT JSON SCHEMA
// Sent to Gemini
// ===============================

const interviewReportJsonSchema = {

    type: "object",

    properties: {

        matchScore: {
            type: "number",
            description:
                "A realistic score from 0 to 100 indicating how well the candidate matches the job description."
        },

        technicalQuestions: {
            type: "array",

            items: {

                type: "object",

                properties: {

                    question: {
                        type: "string",
                        description:
                            "A technical interview question."
                    },

                    intention: {
                        type: "string",
                        description:
                            "What the interviewer wants to evaluate."
                    },

                    answer: {
                        type: "string",
                        description:
                            "How the candidate should answer the question."
                    }

                },

                required: [
                    "question",
                    "intention",
                    "answer"
                ]
            }
        },

        behavioralQuestions: {
            type: "array",

            items: {

                type: "object",

                properties: {

                    question: {
                        type: "string",
                        description:
                            "A behavioral interview question."
                    },

                    intention: {
                        type: "string",
                        description:
                            "What the interviewer wants to evaluate."
                    },

                    answer: {
                        type: "string",
                        description:
                            "How the candidate should answer the question."
                    }

                },

                required: [
                    "question",
                    "intention",
                    "answer"
                ]
            }
        },

        skillGaps: {
            type: "array",

            items: {

                type: "object",

                properties: {

                    skill: {
                        type: "string",
                        description:
                            "A skill the candidate needs to improve."
                    },

                    severity: {
                        type: "string",
                        enum: [
                            "low",
                            "medium",
                            "high"
                        ],
                        description:
                            "Importance of this skill gap."
                    }

                },

                required: [
                    "skill",
                    "severity"
                ]
            }
        },

        preparationPlan: {
            type: "array",

            items: {

                type: "object",

                properties: {

                    day: {
                        type: "number",
                        description:
                            "Day number starting from 1."
                    },

                    focus: {
                        type: "string",
                        description:
                            "Main preparation focus for the day."
                    },

                    tasks: {
                        type: "array",

                        items: {
                            type: "string"
                        },

                        description:
                            "Tasks to complete during the day."
                    }

                },

                required: [
                    "day",
                    "focus",
                    "tasks"
                ]
            }
        },

        title: {
            type: "string",
            description:
                "The job title for which the interview report is generated."
        }

    },

    required: [
        "matchScore",
        "technicalQuestions",
        "behavioralQuestions",
        "skillGaps",
        "preparationPlan",
        "title"
    ]
};


// ===============================
// GENERATE INTERVIEW REPORT
// ===============================

async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription
}) {

    try {

        const prompt = `
You are an expert technical interviewer and career coach.

Generate a personalized interview preparation report for the candidate.

========================
CANDIDATE RESUME
========================

${resume || "No resume provided."}


========================
SELF DESCRIPTION
========================

${selfDescription || "No self-description provided."}


========================
JOB DESCRIPTION
========================

${jobDescription || "No job description provided."}


========================
REQUIREMENTS
========================

Analyze the candidate against the job description.

1. Calculate a realistic match score from 0 to 100.

2. Generate exactly 5 technical interview questions.

3. Generate exactly 3 behavioral interview questions.

4. Generate 3 to 5 important skill gaps.

5. Generate exactly 7 days of preparation.

6. Every technical question MUST be an object containing:
   - question
   - intention
   - answer

7. Every behavioral question MUST be an object containing:
   - question
   - intention
   - answer

8. Every skill gap MUST be an object containing:
   - skill
   - severity

9. severity MUST be exactly one of:
   - low
   - medium
   - high

10. Every preparation plan item MUST be an object containing:
    - day
    - focus
    - tasks

11. tasks MUST always be an array of strings.

12. day must be a number from 1 to 7.

13. title MUST be a string containing the relevant job title.

14. matchScore MUST be a number between 0 and 100.

15. Use the candidate's actual skills, projects, education and experience.

16. Do NOT invent experience, projects, companies, skills or achievements.

17. Questions must be relevant to the provided job description.

18. The answer field should provide practical guidance for answering the question.

19. The preparation plan should be realistic for a student/job candidate.

20. Return ONLY JSON matching the provided response schema.
`;


        console.log(
            "Generating interview report with Gemini..."
        );


        // ===============================
        // GEMINI REQUEST
        // ===============================

        const response =
            await ai.models.generateContent({

                model: "gemini-flash-latest",

                contents: prompt,

                config: {

                    responseMimeType:
                        "application/json",

                    responseJsonSchema:
                        interviewReportJsonSchema

                }

            });


        console.log(
            "Gemini response received."
        );


        // ===============================
        // GET RESPONSE TEXT
        // ===============================

        const text = response.text;

        if (!text) {

            throw new Error(
                "Gemini returned an empty response."
            );

        }


        console.log(
            "Gemini Raw Response:"
        );

        console.log(text);


        // ===============================
        // PARSE JSON
        // ===============================

        let parsedResponse;

        try {

            parsedResponse =
                JSON.parse(text);

        } catch (jsonError) {

            console.error(
                "Failed to parse Gemini JSON:"
            );

            console.error(text);

            throw jsonError;
        }


        // ===============================
        // VALIDATE RESPONSE
        // ===============================

        const validatedResponse =
            interviewReportSchema.parse(
                parsedResponse
            );


        console.log(
            "Interview report validation successful."
        );


        return validatedResponse;


    } catch (error) {

        console.error(
            "FULL GEMINI ERROR:"
        );

        console.dir(
            error,
            {
                depth: null
            }
        );

        throw error;
    }
}


// ===============================
// GENERATE PDF FROM HTML
// ===============================

async function generatePdfFromHtml(
    htmlContent
) {

    let browser;

    try {

        browser =
            await puppeteer.launch({
                headless: true
            });


        const page =
            await browser.newPage();


        await page.setContent(
            htmlContent,
            {
                waitUntil: "networkidle0"
            }
        );


        const pdfBuffer =
            await page.pdf({

                format: "A4",

                printBackground: true,

                margin: {

                    top: "20mm",

                    bottom: "20mm",

                    left: "15mm",

                    right: "15mm"

                }

            });


        return pdfBuffer;


    } finally {

        if (browser) {

            await browser.close();

        }
    }
}


// ===============================
// RESUME PDF ZOD SCHEMA
// ===============================

const resumePdfSchema =
    z.object({

        html: z.string()

    });


// ===============================
// RESUME PDF JSON SCHEMA
// ===============================

const resumePdfJsonSchema = {

    type: "object",

    properties: {

        html: {

            type: "string",

            description:
                "Complete HTML content of the ATS-friendly resume."

        }

    },

    required: [
        "html"
    ]
};


// ===============================
// GENERATE RESUME PDF
// ===============================

async function generateResumePdf({

    resume,

    selfDescription,

    jobDescription

}) {

    try {

        const prompt = `
You are an expert professional resume writer.

Generate a professional, ATS-friendly resume for the candidate.

========================
CANDIDATE RESUME
========================

${resume || "No resume provided."}


========================
SELF DESCRIPTION
========================

${selfDescription || "No self-description provided."}


========================
JOB DESCRIPTION
========================

${jobDescription || "No job description provided."}


========================
REQUIREMENTS
========================

1. Tailor the resume to the job description.

2. Highlight relevant skills and experience.

3. Do NOT invent qualifications.

4. Do NOT invent work experience.

5. Do NOT invent projects.

6. Do NOT invent companies.

7. Do NOT invent achievements.

8. Keep the content realistic and human-written.

9. Make the resume ATS friendly.

10. Use clean HTML.

11. Keep the design professional and simple.

12. Avoid excessive colors and graphics.

13. Keep the resume approximately 1-2 pages.

14. Include relevant keywords from the job description only when they genuinely match the candidate's profile.

15. Use semantic HTML.

16. Include appropriate headings such as:
    - Summary
    - Education
    - Skills
    - Projects
    - Experience
    - Certifications
    when applicable.

17. The HTML should be directly usable by Puppeteer to create a PDF.

18. Include CSS inside the HTML.

19. Do not include Markdown.

20. Return ONLY a JSON object containing an "html" field.
`;


        console.log(
            "Generating resume with Gemini..."
        );


        // ===============================
        // GEMINI REQUEST
        // ===============================

        const response =
            await ai.models.generateContent({

                model: "gemini-flash-latest",

                contents: prompt,

                config: {

                    responseMimeType:
                        "application/json",

                    responseJsonSchema:
                        resumePdfJsonSchema

                }

            });


        const text =
            response.text;


        if (!text) {

            throw new Error(
                "Gemini returned an empty resume response."
            );

        }


        console.log(
            "Gemini resume response received."
        );


        // ===============================
        // PARSE JSON
        // ===============================

        const jsonContent =
            JSON.parse(text);


        // ===============================
        // VALIDATE HTML
        // ===============================

        const validatedContent =
            resumePdfSchema.parse(
                jsonContent
            );


        // ===============================
        // CREATE PDF
        // ===============================

        const pdfBuffer =
            await generatePdfFromHtml(
                validatedContent.html
            );


        return pdfBuffer;


    } catch (error) {

        console.error(
            "FULL GEMINI RESUME ERROR:"
        );

        console.dir(
            error,
            {
                depth: null
            }
        );

        throw error;
    }
}


// ===============================
// EXPORT
// ===============================

module.exports = {

    generateInterviewReport,

    generateResumePdf

};