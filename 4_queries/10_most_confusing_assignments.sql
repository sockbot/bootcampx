SELECT assignments.id, assignments.name, assignments.day, assignments.chapter, count(assistance_requests) AS total_requests
FROM assignments
JOIN assistance_requests on assignments.id = assignment_id
GROUP BY assignments.id
ORDER BY total_requests DESC