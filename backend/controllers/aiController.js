const Employee = require('../models/Employee');

// @desc    Generate AI-based performance analytics and career recommendations
// @route   POST /api/ai/recommend
// @access  Public
exports.generateAIRecommendations = async (req, res, next) => {
    try {
        const { employeeId } = req.body;

        // 1. Fetch targeted employee context from the database
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ success: false, error: 'Employee not found' });
        }

        // 2. Formulate structured engineering prompt to guarantee predictable output metrics
        const aiPrompt = `
            Analyze the following employee metrics and provide performance assessment feedback.
            
            Employee Name: ${employee.name}
            Department: ${employee.department}
            Current Skills: ${employee.skills.join(', ')}
            Performance Score (0-100): ${employee.performanceScore}
            Years of Experience: ${employee.experience}
            
            Provide explicit suggestions across these 4 categories exactly:
            1. Promotion Recommendation: State whether they should be promoted based on performance (especially if score >= 80 and experience >= 3).
            2. Employee Ranking: Quantify their technical tier (e.g., Elite, Star, Developing, Needs Support).
            3. Training Suggestions: List specific skills or certifications they lack or should acquire.
            4. AI Feedback Generation: Provide a constructive personal performance review note.
        `;

        // 3. Make the API call to OpenRouter's completely free tier router
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:3000", 
                "X-Title": "AI Employee Performance System"
            },
            body: JSON.stringify({
                model: "openrouter/free", // Forces OpenRouter to auto-select an active 100% free model
                messages: [
                    {
                        role: "system",
                        content: "You are an expert HR Data Analyst system. Output evaluations clearly, concisely, and cleanly format your points using markdown."
                    },
                    {
                        role: "user",
                        content: aiPrompt
                    }
                ]
            })
        });

        if (!response.ok) {
            const errData = await response.json();
            return res.status(response.status).json({
                success: false,
                error: 'AI API execution failure',
                details: errData
            });
        }

        const data = await response.json();
        
        if (!data.choices || data.choices.length === 0) {
            return res.status(500).json({
                success: false,
                error: 'Invalid response from AI provider'
            });
        }

        const aiAnalysisResult = data.choices[0].message.content;

        // 4. Return the processed evaluation payload cleanly to frontend application client
        res.status(200).json({
            success: true,
            employeeId: employee._id,
            recommendation: aiAnalysisResult
        });

    } catch (error) {
        next(error);
    }
};

// @desc    Handle generic conversational HR analytical questions autonomously
// @route   POST /api/ai/chat
// @access  Public
exports.handleAIChatMessage = async (req, res, next) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ success: false, error: 'Prompt content cannot be blank' });
        }

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "HR Chat Engine Plugin"
            },
            body: JSON.stringify({
                model: "openrouter/free", // Completely free model proxy tracking
                messages: [
                    {
                        role: "system",
                        content: "You are an automated corporate strategic assistant specializing in MERN full-stack metrics, performance evaluation matrices, training recommendation paradigms, and high-level corporate talent tracking logic. Give clear, ultra-short answers."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error('Upstream conversational router processing error');
        }

        const data = await response.json();
        res.status(200).json({
            success: true,
            reply: data.choices[0].message.content
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Algorithmic query matching top performers strictly by data metrics
// @route   GET /api/ai/basic-match
// @access  Public
exports.getBasicMatch = async (req, res, next) => {
    try {
        // Query criteria: Performance Score >= 80, sorted highest to lowest
        const topPerformers = await Employee.find({
            performanceScore: { $gte: 80 }
        }).sort({ performanceScore: -1, experience: -1 });

        res.status(200).json({
            success: true,
            count: topPerformers.length,
            data: topPerformers
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Process entire talent pool via OpenRouter to build a ranked promotion shortlist
// @route   POST /api/ai/shortlist
// @access  Public
exports.getAIShortlist = async (req, res, next) => {
    try {
        const employees = await Employee.find({});
        
        if (employees.length === 0) {
            return res.status(400).json({ success: false, error: "Talent database is currently empty." });
        }

        // Format all employee nodes into a clean data string for context matching
        const poolContext = employees.map(emp => 
            `- ID: ${emp._id}, Name: ${emp.name}, Dept: ${emp.department}, Score: ${emp.performanceScore}, Exp: ${emp.experience} Yrs, Skills: [${emp.skills.join(', ')}]`
        ).join('\n');

        const shortlistPrompt = `
            You are a senior enterprise HR optimization system. Review this employee database pool and generate a highly curated, ranked shortlist of top candidates ready for immediate promotion or leadership training tracks.
            
            Employee Pool Matrix:
            ${poolContext}
            
            Output your assessment cleanly using Markdown format with these exact sections:
            ### 🏆 Tier 1: Immediate Promotion Track (Ranked high to low)
            ### 🚀 Tier 2: Leadership Training Track (High potential nodes)
            ### 💡 Core Strategic Observation Summary
        `;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "HR Shortlisting Matrix Engine"
            },
            body: JSON.stringify({
                model: "openrouter/free", // Keeps token routing completely cost-free
                messages: [
                    { role: "system", content: "You are an elite talent analyst. Output structured candidate rankings clearly, concisely, and cleanly using markdown styles." },
                    { role: "user", content: shortlistPrompt }
                ]
            })
        });

        if (!response.ok) throw new Error('Upstream AI generation connection loss');

        const data = await response.json();
        res.status(200).json({
            success: true,
            shortlist: data.choices[0].message.content
        });

    } catch (error) {
        next(error);
    }
};