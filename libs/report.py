##############
# By zhangtanliu
# 3/6/2022
# ref. liaoxunfeng
# https://www.liaoxuefeng.com/wiki/1016959663602400/1017803857459008
# https://www.cnblogs.com/mrchige/p/6389588.html
# https://www.cnblogs.com/awfj/p/11004185.html
##############

from sqlalchemy import create_engine, desc, func
from libs.Tables import KPI, Result, Model
from sqlalchemy.orm import sessionmaker


class ReportQuery(object):

    def __init__(self):

        engine = create_engine('mysql+mysyldb://root:serverIP@port/tablename')

        DBSession = sessionmaker(bind=engine)
        self.db_session = DBSession()

    def query_screen_num(self):
        screen_num = self.db_session.query(func.count(Result.id)).scalar()
        return screen_num

    def query_kpi(self, id):
        kpi_objects = self.db_session.query(KPI).filter(KPI.id == id).all()
        return kpi_objects[0]

    def query_result(self, model_id):
        result_objects = self.db_session.query(Result).filter(Result.ModelID == model_id).all()
        result = []
        for rst in result_objects:
            value = rst.value
            kpi_id = rst.KPIID
            kpi = self.query_kpi(kpi_id)
            if len(value) > 0:
                result.append({"kpi": kpi, "value": value})
                return result
        result.append({"kpi": None, "value": None})
        return result

    def query_data(self, name, start, end):
        data = {"data": [], "totals": 0}
        filter_string_base = "self.db_session.query(Model)"
        filter_string = ""

        if name is None or len(name) == 0:
            pass
        else:
            filter_string = filter_string + ".Model.name.like('%{name}%')".format(name=name)

        end_string = ".order_by(desc(Model.id)).slice(start, end).all()"

        model_objects = eval(filter_string_base + filter_string + end_string)

        for model in model_objects:
            id = model.id
            name = model.name
            tmp = {
                "name": name
            }
            rsts = self.query_result(id)
            for r in rsts:
                tmp.update(r)
                data["data"].append(tmp)

        count_string_base = "self.db_session.query(func.count(Model.id))"
        count_string = count_string_base + filter_string + ".scalar()"
        data["totals"] = eval(count_string)
        return data

    def close(self):
        self.db_session.close()


# for debugging
if __name__ == "__main__":
    myDB = ReportQuery()
    myDB.query_data("model")
    myDB.close()