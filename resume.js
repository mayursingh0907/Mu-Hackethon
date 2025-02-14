document.getElementById('resume-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const jobDescription = document.getElementById('job-description').value;
    const resumes = document.getElementById('resumes').value.split('\n');
  
    const response = await fetch('/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jobDescription, resumes }),
    });
  
    const result = await response.json();
    document.getElementById('results').innerText = result.rankings.join('\n');
  });
  