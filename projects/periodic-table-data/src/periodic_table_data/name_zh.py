"""Simplified Chinese single-character element names (Z 1 to 118).

Source:
https://codegolf.stackexchange.com/questions/283358/chinese-periodic-table-of-elements-%E5%85%83%E7%B4%A0%E5%91%A8%E6%9C%9F%E8%A1%A8
"""

_TABLE = """
氢　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　氦
锂铍　　　　　　　　　　　　　　　　　　　　　　　　硼碳氮氧氟氖
钠镁　　　　　　　　　　　　　　　　　　　　　　　　铝硅磷硫氯氩
钾钙　　　　　　　　　　　　　　钪钛钒铬锰铁钴镍铜锌镓锗砷硒溴氪
铷锶　　　　　　　　　　　　　　钇锆铌钼锝钌铑钯银镉铟锡锑碲碘氙
铯钡镧铈镨钕钷钐铕钆铽镝钬铒铥镱镥铪钽钨铼锇铱铂金汞铊铅铋钋砹氡
钫镭锕钍镤铀镎钚镅锔锫锎锿镄钔锘铹𬬻𬭊𬭳𬭛𬭶鿏𫟼𬬭鿔鿭𫓧镆𫟷鿬鿫
"""

NAME_ZH: list[str] = [ch for ch in _TABLE if not ch.isspace()]

assert len(NAME_ZH) == 118, len(NAME_ZH)
