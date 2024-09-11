Make sure you're in a python venv:

python -m venv newenv
source newenv/bin/activate

pip install -r requirements.txt


Migrations:

flask db init (initialize database completely -> already done)
flask db migrate -m "Initial migration" (any time you need to update the database with a new table or something)
flask db upgrade (executes the migration)
