sed -n '1428,1435p' messages/it.json > t1.txt
sed -n '1447,1451p' messages/it.json > t2.txt
sed -n '1596,1615p' messages/it.json > t3.txt
sed -n '3997,4005p' messages/it.json > t4.txt
sed -n '6523,6528p' messages/it.json > t5.txt
tail -n 12 messages/it.json > t6.txt
grep -n -B 1 -A 2 '"focusHeading": "Typische Projekte in Amman"' messages/it.json > t7.txt
grep -n -B 1 -A 2 '"focusHeading": "Typische Projekte in Kairo"' messages/it.json > t8.txt
grep -n -B 1 -A 2 '"focusHeading": "Typische Projekte in Istanbul"' messages/it.json > t9.txt
grep -n -B 1 -A 2 '"focusHeading": "Typische Projekte in Singapur"' messages/it.json > t10.txt
grep -n -B 1 -A 2 '"focusHeading": "Typische Projekte in Kuala Lumpur"' messages/it.json > t11.txt
grep -n -B 1 -A 2 '"focusHeading": "Typische Projekte in Mumbai"' messages/it.json > t12.txt
grep -n -B 1 -A 2 '"focusHeading": "Typische Projekte in Kapstadt"' messages/it.json > t13.txt
grep -n -B 1 -A 2 '"focusHeading": "Typische Projekte in Nairobi"' messages/it.json > t14.txt
