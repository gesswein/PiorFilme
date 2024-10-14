const sqlLongestInterval=`WITH intervalos AS ( 
    SELECT p1.producers as producers, 
    p1.year AS followingWin, 
    (
        SELECT p2.year 
        FROM movie p2 
        WHERE p2.producers = p1.producers 
        AND p2.year < p1.year 
        AND winner='yes' 
        ORDER BY p2.year DESC LIMIT 1
    ) AS previousWin 
    FROM movie p1 
)

SELECT producers, 
MAX(followingWin - previousWin) AS interval, 
previousWin, 
followingWin 
FROM intervalos 
WHERE previousWin IS NOT NULL 
AND (followingWin - previousWin) = ( 
    SELECT MAX(followingWin - previousWin) 
    FROM intervalos 
    WHERE previousWin IS NOT NULL 
    )`

module.exports = {sqlLongestInterval}