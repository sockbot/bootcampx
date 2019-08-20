SELECT day, count(assignments) AS number_of_assignments, sum(duration)
FROM assignments
GROUP BY day
ORDER BY day