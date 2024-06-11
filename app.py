from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import date, datetime
from collections import defaultdict

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
db = SQLAlchemy(app)
migrate = Migrate(app, db)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    task_date = db.Column(db.Date, nullable=False, default=date.today)
    task_time = db.Column(db.Time, nullable=False)

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    tasks = Task.query.order_by(Task.task_date.desc(), Task.task_time.desc()).all()
    tasks_by_date = defaultdict(list)
    for task in tasks:
        tasks_by_date[task.task_date.strftime('%Y-%m-%d')].append(task)
    return render_template('index.html', tasks_by_date=tasks_by_date)

@app.route('/add', methods=['POST'])
def add_task():
    task_title = request.form['task']
    task_date = datetime.strptime(request.form['task_date'], '%Y-%m-%d').date()
    task_time = datetime.strptime(request.form['task_time'], '%H:%M').time()
    task = Task(title=task_title, task_date=task_date, task_time=task_time)
    db.session.add(task)
    db.session.commit()
    return jsonify({
        'id': task.id, 'title': task.title, 'completed': task.completed,
        'task_date': task.task_date.strftime('%Y-%m-%d'), 'task_time': task.task_time.strftime('%H:%M')
    })

@app.route('/delete/<int:task_id>', methods=['POST'])
def delete_task(task_id):
    task = Task.query.get(task_id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({'result': 'success'})

@app.route('/toggle/<int:task_id>', methods=['POST'])
def toggle_task(task_id):
    task = Task.query.get(task_id)
    task.completed = not task.completed
    db.session.commit()
    return jsonify({'id': task.id, 'completed': task.completed})

@app.route('/edit/<int:task_id>', methods=['POST'])
def edit_task(task_id):
    task = Task.query.get(task_id)
    task.title = request.form['title']
    db.session.commit()
    return jsonify({'id': task.id, 'title': task.title})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
