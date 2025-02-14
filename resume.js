class ResumeScreening {
    constructor() {
        this.jobDescription = null;
        this.resumes = [];
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Job Description Upload
        const jobBox = document.getElementById('jobDescription');
        const jobFile = document.getElementById('jobFile');

        jobBox.addEventListener('dragover', (e) => this.handleDragOver(e, jobBox));
        jobBox.addEventListener('dragleave', (e) => this.handleDragLeave(e, jobBox));
        jobBox.addEventListener('drop', (e) => this.handleJobDrop(e, jobBox));
        jobFile.addEventListener('change', (e) => this.handleJobFileSelect(e));

        // Resumes Upload
        const resumeBox = document.getElementById('resumes');
        const resumeFiles = document.getElementById('resumeFiles');

        resumeBox.addEventListener('dragover', (e) => this.handleDragOver(e, resumeBox));
        resumeBox.addEventListener('dragleave', (e) => this.handleDragLeave(e, resumeBox));
        resumeBox.addEventListener('drop', (e) => this.handleResumeDrop(e, resumeBox));
        resumeFiles.addEventListener('change', (e) => this.handleResumeFileSelect(e));
    }

    handleDragOver(e, element) {
        e.preventDefault();
        element.classList.add('drag-over');
    }

    handleDragLeave(e, element) {
        e.preventDefault();
        element.classList.remove('drag-over');
    }

    async handleJobDrop(e, element) {
        e.preventDefault();
        element.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        await this.processJobDescription(file);
    }

    async handleResumeDrop(e, element) {
        e.preventDefault();
        element.classList.remove('drag-over');
        const files = Array.from(e.dataTransfer.files);
        await this.processResumes(files);
    }

    async handleJobFileSelect(e) {
        const file = e.target.files[0];
        await this.processJobDescription(file);
    }

    async handleResumeFileSelect(e) {
        const files = Array.from(e.target.files);
        await this.processResumes(files);
    }

    async processJobDescription(file) {
        try {
            // Simulate file processing
            this.showProgress(30);
            const text = await this.extractText(file);
            this.jobDescription = this.analyzeJobDescription(text);
            this.showProgress(100);
            
            if (this.resumes.length > 0) {
                this.matchCandidates();
            }
        } catch (error) {
            console.error('Error processing job description:', error);
            alert('Error processing job description');
        }
    }

    async processResumes(files) {
        try {
            this.showProgress(20);
            for (let i = 0; i < files.length; i++) {
                const text = await this.extractText(files[i]);
                const resumeData = this.analyzeResume(text);
                this.resumes.push({
                    name: files[i].name,
                    data: resumeData
                });
                this.showProgress((i + 1) / files.length * 100);
            }

            if (this.jobDescription) {
                this.matchCandidates();
            }
        } catch (error) {
            console.error('Error processing resumes:', error);
            alert('Error processing resumes');
        }
    }

    async extractText(file) {
        // Simulate text extraction
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(`Sample text extracted from ${file.name}`);
            }, 1000);
        });
    }

    analyzeJobDescription(text) {
        // Simulate job description analysis
        return {
            requiredSkills: ['JavaScript', 'Python', 'React', 'Node.js'],
            experience: 5,
            education: 'Bachelor\'s Degree'
        };
    }

    analyzeResume(text) {
        // Simulate resume analysis
        return {
            skills: ['JavaScript', 'Python', 'React'],
            experience: Math.floor(Math.random() * 10),
            education: 'Bachelor\'s Degree'
        };
    }

    matchCandidates() {
        const results = this.resumes.map(resume => {
            const matchScore = this.calculateMatchScore(resume.data);
            return {
                name: resume.name,
                score: matchScore,
                skills: resume.data.skills
            };
        });

        results.sort((a, b) => b.score - a.score);
        this.displayResults(results);
    }

    calculateMatchScore(resumeData) {
        // Simulate match score calculation
        const skillMatch = resumeData.skills.filter(skill => 
            this.jobDescription.requiredSkills.includes(skill)
        ).length;
        
        const skillScore = (skillMatch / this.jobDescription.requiredSkills.length) * 100;
        return Math.round(skillScore);
    }

    displayResults(results) {
        const resultsSection = document.getElementById('results');
        const candidateList = document.getElementById('candidateList');
        
        resultsSection.style.display = 'block';
        candidateList.innerHTML = '';

        results.forEach(result => {
            const li = document.createElement('li');
            li.className = 'candidate-item';
            
            const candidateInfo = document.createElement('div');
            candidateInfo.innerHTML = `
                <h3>${result.name}</h3>
                <div>
                    ${result.skills.map(skill => 
                        `<span class="skill-tag">${skill}</span>`
                    ).join('')}
                </div>
            `;

            const score = document.createElement('span');
            score.className = 'match-score';
            score.textContent = `${result.score}% Match`;

            li.appendChild(candidateInfo);
            li.appendChild(score);
            candidateList.appendChild(li);
        });
    }

    showProgress(percent) {
        const progressBar = document.getElementById('progressBar');
        const progress = document.getElementById('progress');
        
        progressBar.style.display = 'block';
        progress.style.width = `${percent}%`;

        if (percent >= 100) {
            setTimeout(() => {
                progressBar.style.display = 'none';
                progress.style.width = '0%';
            }, 1000);
        }
    }
}

// Initialize the application
const app = new ResumeScreening();