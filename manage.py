###########
# by zhangtanliu
# 3/6/2022
###########

from flask import Flask, request, jsonify, render_template
from libs.report import ReportQuery

app = Flask(__name__)


@app.route('/')
def index():
    myDB = ReportQuery()
    screen_num = myDB.query_screen_num()
    return render_template('index.html', screen_num=screen_num)


@app.route('/grid')
def grid():
    return render_template('grid.html')


@app.route('/grid/data', methods=['POST','GET'])
def grid_data():
    myDB = ReportQuery()
    post_data = request.form
    cPage = int(post_data.get('cPage'))
    pSize = int(post_data.get('pSize'))
    name = post_data.get('title')

    data = myDB.query_data((cPage-1)*pSize, cPage*pSize, name)
    myDB.close()
    return jsonify(data)


if __name__=='__main__':
    app.run(port=9091,debug=False)