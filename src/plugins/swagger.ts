import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fp from 'fastify-plugin';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

const logo =
    'iVBORw0KGgoAAAANSUhEUgAAAZoAAACBCAYAAAD5YHyPAAAACXBIWXMAAAsSAAALEgHS3X78AAAbQElEQVR4nO2d7XXbuNLH/3nOfrduBcGtILoVBKlgvRVEW0G8FUSpYL0VhKlgnQoWruDaFSxUwbUqyPMBxJKiSIoE/0OC8vzO8bFeiOGIBGcwg7c3P378gKIoiqIAMOUfk5efyAIVRVGU9bID8Jks85s6GkVR5sIAuAWwRdVqfl/+PwJ4Kl+78vXDfKopJRsBmf6Nps4URRFmB+AOwLuR5Y4A7su/F7JOSjsOlfNn8Ys6GkVRpNgiRCVvJ8o5IERCT5cOVCbjMf1+NfmgjkZRFAl2AL4S5R0R0m0a2cgi4RD+9X8CQhVFed1YcJ0MANwgpNAUObZCcl/U0SiKwqYQknsrJFcJSAwEeAQAdTSKojDZgZ/jj9wgREuKDFZA5gugjkZRFC53SyugJCMR0TwB6mgUReEydgizkg8SfTQeUEejKAoPu7QCyiREJmsCgK4MoCh5s8d4A/6E601huaUVuGIkolEPqKNRlNyx4M/UXiuPSytwxRghuR7Q1Jmi5E6Kk3FsJQYiPZmyEJb/mjECMp/jC3U0ipIvUhPopHhCmMEvwQHqaCSRqGv/NDzU0ShKvqROUHRMJUYiNXt/JyRXCUgMBHDxhToaRcmXVEez5Hpg96ilTEj8Ch0EII0VkKkRjaJkzhbpo4CWXOX4BcFBMpzNAcAHaMpsrfxTD9XRKEqepA5PPlC1SMMjtJC/IK3P5lCW3UIjmbmQGNn4T0Sj2wQoSn4YAH8nln1EfhMn466atnxfN2oHBMf0gmpXTd13Zl42AP4nIPdNfKHzaBQlP/YTyuZopB+g2zLnjMSIs5PIWlNnipIXFsDHCeV1YzBlLEZApq+/UUejKPmwwfSWf44RjZI3RkDmST1UR6MoebBB6Pi+mShHIxplLKKTNYHr6qOxCJ7Z9Bzjyz8nrMtSbHE68WqDqhK5xrHN90rAoKpD8drF1tkLZCKG6GQYixo6ggzldSE6WRNYt6PZIswWtkh7QJ8Rxuc/oJFPzJzoPCwqo7jF5Zbw547PH1E5X4d1XQsGG4RRUbcI13RIRPGM6npNTXVtEeohw8lILf+iXDfiSx2lDm/eo9twpfAbhi1dsUFwLnfgbhf7HeE35Zjf3iAYwPgnvbHUAcF43mM+p7MHtz59x+VZ9ZvyvDtMS1cdEepjUfvMYtgQ4w2ATxPOLcEHpEVFFsBfVE0CKcO1Lfi6DLVRY5AYVvzm8iFnSMxxOdEjNaJhe8BiwDF7hAd6ag67jZ/Lvz/K8yyd5663sn+e+dxvEYzfJ4SHfI/1pWMuRRl78OrSDc4d8g7TRo4tSW6NrVz0cQIy2XY0ZTUGS9YBaImsUx0NM6f3Df2G3SI4ImYE08Wn8nw7LFPBd1jGuXTxHqFl+B3BMPtFtRnGEd0NF2ZfSJ1m/TVk+XOydCOriUsoY8k6ADL2wJDlpego0T9zpkcOo876Wp97BEM3h5OJvEOo3HMt0W4QQvIXAF+Rj5Op8zNC5Uld5HFOuurTFsFRSqQemw/W2pb3j+S4sZhbWgHIXRdDlpfiaCTqqm9+sLSjif0BbRTg5u3HcINQwY3gOWx5jr8RIimJlCCTGwB/Ytqs9Tloy6PHNbMkrnHb2mK538u1cEAeEZYTkss28imOxpB1AIiOxkxSo6LPySyd476BzLIZO4QK8RfWuUXvZ+S7mu4B5w+bgZyTAc4fKit0njlwSyvQIDVdxU4HSaXR2Xq6hDKGrANATJ2xUllFx2dLO5nIO3Bb8BYhPSY9ckyaj8hzI6q2hsEDZCMM33gvkfOeiynRg2UpUSPVwOcQKQyBqWfqtgyGqEPkrB4tmTo74vwG3iEfJxP5DN7NsCQ5OfAVvAfFkOQ0Hc0e8k7dN96vtX8GyGeEV8QtrQCCnfJCspkNoNR7J9H/TYlozHQ9AJwbhS2A30my2exJctbc2m2jIMkxBBlHnBqmLebp42s+VGu+x35pBRqkGk+TgQ6XsGR5uQwEAEgRjZmuB4Dz1kpBkivBR3B+95pbu228Qz4pNNd4z55c10XzoVrzPfZLK1BjykAAZivdEWXVyaEfSaJR1DpCb8nUWf3C3CH/fosdQYYhyMiNPUGGIchwtdcW8w20cI33Zqbzspm69bJlKFHDk+Wlsob+GSBNT0vWAehoHKQ4GjtNDwCn/TNxKZDc2RFkzDkfaC7eYnqdYFwXV3t9R5A3hLa1xdZ6j3MYRlzHJZazRB0AOYdniLJSo79ZJmsCy0U0dWVusY55B28xrRWy5pTKJXZLK4CqThnMN+n1WiZqAvkNBPBLK1AidV0MUVYuo/OAjvuW4mgYyrna6z1B3lzYCWXX3El8CbtQ2Ug9L7wjyBtKsxW55ns8NaJhpyp9YjlL1GFqOrEPQ5SVy3wjoOO+pax1xlDOl/+3GJZqeER7KG0x76RHi/ROZoaDPuB0Px3XdSCq7QMs5Pu/YrS3VKu4GSEvcd7Il4FlmSPiDpg+mGZqeTY5RFiS6URmijX1WknYBd/2YYqjYRjMr+VfH48Ilb+4cNwGISfPWo23jym/PcVB1/c9cUiv+AbV9gpS1yjV0TDqky//G8w7qMQ33jsM61vYgOtoPJbNDBiyvCPS67ol6uGIsuqwU1Y+oYwh6xDxbR+mOBppY962v0cfLwgP2QNklxoBprVC7IBjjgi/I/4WVovKI1yjopQtYYxNYjlGhBwdnCXIGoNPLMc2NI4sbyyGLC+HaAaQi2hyGNpsyDoAPanGsY5GurPzGSH14RPKPqFaqFLS2cRzjKWrctWdi8TaanU8gv5P4I+OSq0bjDqVuslVffSjq32+QaWXQfe1ymFC4TXiJ5RlptLXMFkz66VnImMdjWRn5zPCDZjSinhCaLnnuMJAM4oYmhpk84KQRmPvQJhaN+buQE/dwtui6vOyCI2ZKalMJo4sbyyWLM8nlmPXJU+WF2Hq6RPLGaIOEdf1xdhRZ3aSGt0cESIZRqh6j/al21nYhDKm/H9E2MXz36g2dFsCB9lrNIa5hgQ/AvhPeb57jH9AXVnuFsFQ/GeCLuzfnNscmKn4xHI59H0MgalnTiPOOuvh0vvRRHbg3tS5lh8Zw68IDucOecwRkE7TDWWOPr9fUKUMWUyRlUOOnkkuBt4QdZAc2pxDRCPRwOushzlENN/BN3q5GNGIR4hecmp5Lm2cAPnO+5iOza0+MPsRcohMc3GchqiD5LPKHIzjibKm4ru+yKGPRmK5EI/wAK51OZA58EsrANn+mQOm9/mtAb+0AsgnFWiIOqxhRQAgXU+J+Ye+64uxEQ17WOw3yD0oUnIVHlL9M8w+PzaWLC+HyJSZ/mxd/XcghqUE5OqOIcvLpY733rcxjsZM06MVyb4UJyhb4WCE5O6RhwFugx3FLW1ocolmAK4ujiirDlPHVKc829IzkSUdzTPyNQavAUuW5xLKGLIOQHj4chwMEmEb5qWfoVz6ZwBuZLWGyZqpOkpkEnzfl2P6aNjKFWR5rx3b8RoIBt20fLY0EhV+LyCTiSHL04gmYJlKYB2TNZduZNRxfV+OcTTslosjy7t2TPlnUc1c3yCfDeNSKj17aHPX4qs5YcjyHFneWHKJaJh65DCSbwhLNzLq9N63pSKaA/LyxrmxwelM9C3y37NnbKW3AjoUAjLZMJ+jto3X5saS5fnEcszrmqrDEHJYIscSdQAGbLy2VETjiLLmxgnJNQgjpW4x79YHLNzI4yU6JHObL9MGs8GQQ2Mtl2VfcpgEeYlcrhWbi/VwjKPJwRNfGxuEVRF2yCcFlkJKy5qd2/+OvFIJbeQyg54Js95OmY2/hojmGu8/QHQ0ueRhc8ATZBiETuuPBFk5kHI/DVmHNUQz19aizWmotmEpgXVM1pRcImcs7tIBQx0N2xM7srw2rJBcP6GswXU5mEiKgTBkHRxZngSWLM+T5Y0lJ7vAXAVkDZM1p+hoWUqU0CIaM02PE9YyoqONVN03CEvtMHdVzImUFiC7U9wT5UlxbRGNWfj8kZwcXh9rmFA6losDAYBlHI0nyupj1rV8etgijIZacx/MJXxCmWvrFB/CtU3WNGR5LrEc04FLjuSTXNtvKdyQg4auDGCS1ThnjodD6ob6kcfvAPwX1+1kgPHXxZLPv7TBHYohy1t68MM1TtaUrEvXGNEMul5LOJo5Hg6pxRr9iGN3AL7KqDEJiU7EsQ/ntaWQhsLsR5iy+CSLaxwkJGmf1rBEzljckIOWGAwwxwWyQnLdwON2mNfJHBEe0ieE6xv/x9d1NgD+Rz7/2Ht6bSmkIRiyvBwMTS776liWEljH0jPAND2Zz98gPYY6mrXl06UimiG67yDvZJ4RnF78G2N02NcmpWVtyDrkYHQvYcjy1uBcx+AnlF3DZE1DlDV1QBXLng9+9oc4Gpuux2JYAZlDRldsIbdy8DPCoIIHTHsYpJzwGAxZ3hqMbi79GSwsWd6Ue7iGHSvXMKF0LG7ogUMczdpGSkitCzbkQSgEzv2IMPfGkeRZkpyISyjDXjdvDVxbf0YukzUNUwnIOfDZ01Uz4IYeOMTR5NACHsNOSO6lm7sHt2V1RPgt7Bnvliwv5cFkOmNPlCWJJcvzZHljyaWfzTCVgJwRZ/ZnMZ1h7N8FQp3yje8NqmvcbMQPvlbXGNHcCsl1Pd/FCZksniGz3/0t+BHX2AfTLnz+pbi2kXaGLC+1rq+hIcy2SVPr/G+lDJdQdoNwzbcYcc+WiGgs5MaAW3CHkNZxPd/dgWfAD5BxMoCME/Yjj88l5TI3uSw+ycKQ5bnEcmtoCLOfu6l1fko/8guqQUiDGTKPxozXpRfJirETkvt9xvPuIGM8DWTWWPMjj1/LciFMrtG5spcQSuU1RjSOLE+cIY6GHSFIVQwDucUqXc93t+BdI8kdIvcCMlNa1oatxAq4Nue6QT5THnKPaHbgXqscNrsbzaXUmYRTeI9QOditsj1ZXp2+Dnlma4Xd8R/ZQsYJp9xDQ9bBkeVJYJZWgAzbLvgJZdfgaJhI9ElanHb6N8/np573kqORuom34G67ayEXzTyj/0GwxHNJdWwXQnJT9M0l5TInZmkFyBiyPD+hLHsdQQte4+UW/MV9PUHGBkG3HYbrd0RoCO9TdLiUOrNjBQ5kR5S1gexe8X2yDeQGH7AoILeo59JDm9cy4owdARiyvKXPn9N9ZN2rDWQmb/uJ5e9KGV8xzgneIDTm/0bC7xq6qCab9+A5sXvIGvu+dFbuHZE7yG6y5kYeb8nn92R5UrAzA5Ykwyx4/jo5DG6IsFLhUnbJJ5bbIDyvv2N6Y+8TRjbul4pogGDApz6ABWQN6Xf031i2o2H299wjv9Wjr20uyVDY6ZO3SOuTjPO9ngD8hXRHk1qui5wiGkYj+B5ydsknlIlOhlkPP2JEZuqSo5HsaLtB+PEp59ggOCrpLZGLC9+zHc2OINMgXNdPE+UMwY08PpfZ5NfAZwRnc+n52SI4lweEVbt/R5VKTb1+7JZ6ThENEJ77VNtXQPbZS7lnBWTS5/uhB7758eNH3/e9X5I4IjwIxcDjdwg/ULpv5IDLLTcHfmv1iBDZuJHlDMK1mXO76Dcjjy/AbRx8QP6jzrYIm99J0hwWv0U1g7svTTL2/gGhtf9XQrkuHjEtgpCyUc8IdskNPN4iRDLSmxyOvWe3AP6UUKRk0DPYN+rMEBUBwk37ueX7G4QUzx6h1fWAaj+ViC3/dpiv830/03ma3CA8yI8IhvkJ3a0Yi2BMLNqvbZ1vpbwtQqt2KjlsD7CGiGaO4bfvMb7Bk7pxGjsqzS2aibzD6XPocWpQ60ux7NDtYGLDEaWcKfYrZd6axICEOhaZOJqohEW/MXyLEHLOkfK5xAGyI9mGkGI8+tgjPCyGKHMs7OgvVyO1BlKvXW7pzwNkG59Tn8MClQ2cqufYe2YJ56TQ10eT06SsudkvrQCZR1TX35Bk+otHnMI6bySHrYzXTKqBN0wlML2x4BlKCFKU/xn2dOy1kljbMIk+R8MI+et7hawhzQFUG4xdE/vaa0uS6Uce/1pSLmvBJ5ZjR6VT7YJnKCHEI6rfx6j/Y6+VJZyTgnRE42uvn7COmdx3I471UkoQ+Y7THCrbUAwlt5TLa8cnlJGYNza1wZBzPdjXXtsFzi89MGEw0hFNEycgk8kfGKdjzpUcqEb0RZiGwo08/rWmYt3SCnTgE8pIOJqpz5BjKCFA20jAqYy5VpZwviH4IQf1ORqJlm8hIJNFHM44BiegB5M9TiuCXUSLwGt1NECekbxPKGPJOjB4Qp7beddtyQac6CLHdLEfclCXo5EakvmAPCtF3DZ5LLlWciCkzJpDG5fqHNyAP/rFk+VJ4pZWoEHqxmnsxgJrA7e+ZaKW4AtOo49sOuUFcEMO6nI0kmt47QVlp3KL9BC+IOrB4hnnjnMDbpS6dBjvBWRK4ZZWoEFqy5id82e10KXniozhGec2zpJke5IcFpc2hPyHLkdjOHq0OqwCeWxFG/kV0wzBPfJKjTyjfStoSz7PGCORa0t4LoqlFWjgEspYsg5MPMKE5KWpT86sw4po/Ihj50izDY4kpR1N1/IXO+RhnH/FdCPwArktpMfS5WSAZcN3S5aXY666jxfkYQgjKdfPspUAdzDNHsvalCPCNfKNz2/B3RpjKNKjfEdNapd2NEB7f88TljXOR4SlcQqSvAcsb0jimlFdRmRJR8OOaBxZ3hzcIY/GFZBm4C1bCXAbDB7jB/OwiE6m7bou+dxJ9l2NutZzOJouI/OAEFHM/fA9I+jkyHJ3WM7ZfMFlJ8NsVY1JXV1a2DGFtUU0QNA5h07hb1h+Z1QpCgSbMicxi9B1TVn3PCVdvCedu8k3jHRicwwGMD3fFQg3aY6RW0cAvyH8Ni90jh2C0Z+LRwD/weUKtSOfd4yht+RzA/nPX+rCYZnGFRCMw78R6sJYRy3RWJCiwHzO5g/0O5kdeNctpXHlEWwek29IsCddjoZZqS45rafymC+QeQCPpWyDeUan7BGMv+RaXI8IqT+Ly0Z3g8srO0uS42zyJSkQ7tscAxoOCHU/OhifKMdy1JmNArLPYGzg3aG/LuYQwd6D52y+ILHR2rYfjcVy+01sEG7eDtPnXcQ1ywosZ5gsurdHGMsBIVwtMK5Fb8CPaDzG7R9kyOffk+UtxQ6hfjCHDT8jRE4FeJGfhYyzcZDvb7tFuM5Tn8EjwvN3j+HXdT/xnHU8pvUpbxH0GXsd4u/eY0ImqM3R3IK7Uc4fSOuk26Kq4Ab9D+MR1b4tTwiV1yecU4oNTveOMeh3pPH3eFS/Z63pIuUyBuG5swh1ZGgj64Bqn5RY9z1Zt2vB4NSeXJpT9ozT58/JqDU7BqfXAahSo8+oGuUO4bdTBhS0OZo9uLs0fgG/BRr7WdacQqmzhToS5ZQNutOObkY9XgMbBKOrz6AQbRufsZefcWR5wPVViGv7Pcp0XqAOZS5eoM+gKG2DAdYwjFFRFEVZCW2pMw/uAohviLIURVGUldHmaM4+mMARcitBK4qiKCugmTpjp80076koivLKaToadvThyfIURVGUldF0NJYs35PlKYqiKCuj6WgMWb6mzhRFUV45zXk0hiz/WiZUKopyPbjaaysg/x5Vf7eE/NXRHHXGHHEGAP+COhtFUfKibuckpl84VEvc6PQOnKbOjIB8dTKKosyBRXAgP3A9i64ycKiuy2LUU2eGLFtymXxFUZRU5twzSsGpo7Fk2RrNKIqSI/ulFXht1B2NTtZUFGVtbHG+0rXBecPZtZRpft6GbZHFWj6/qbdH+5QQg9Nl/eOxD2hv0Nfl1udG2sZxXee7xbk/cJiwyGt9MIAHd42zXzFtox5FUZRLOFzeWwY47ZSvl+nqrLcI9qvLJh4R9tkqLujUJX9THhf32TrifMfcDUL09alDBtC+DYvFsM0rm2V3CCPmunZYPiA4odFBRBwMsAHXyQA6WVNRlHWyQzDUfTbxBsBXpG8PX+Cyk3HodzJA2DusSNShzg7h93Q5GSBcj/8ioZslps4ktgbwAjIVRVHq3KFKFf1efvYN6cZ3i2BwIwecbmNsyvfRCX1CSGG5EecocLql8g7nUUKB012Fm79pB+Bj+fpjqd++fP8E4EP5+r4mJ34W8eX/DU4d5nMpK6bl4jbQ0Qk9IFyHwf3w0dHYoQVG4AVkKoqi1GlL43ik9yc0Da7FuUGNjiUa8LsR5ytQOQggdDE0+3u2OHVEbd0QDuG3R+d6h6D7C043zXtplGkjbuUMBMdqW8oVCNf1pvy7bdGpk5g6Y0c0z2R5iqIo0hic9vfcor3V/lJ+F/m55Zg2djh3MkXLcXe1133R2T2qaSTR+Kdga68dun/zvvZ+1LmkIhod2qwoytqoG8/v6M/KeJzOxzEXjt/hNCX3G7odiK29vtQH9IDKOY6KMmrUo0KLkEprs+FF+Tfavv+EcIH6OoBScGR5iqIo0pja6yEjq/YD5VqcOplv6Hcg9UEIt+iPHkztdeo2L/Xf+rZ8v0ew4772XXIA8RNk+mc0olEUZW3UuxAcUWazD2aMffw88lwpeIQ0XnSGb2uvjwiOxyH8jqT5kT+VApqjEaaikzUVRVGCfW1mjFJGqg1hSmaqQDVyrd5PdVO+f4/g9A4IfUijJqz+hO7ZoYqiKK+JeqSxBccRROP/DcHOxghl6BDhOVd/dqhWILAI12CLU8fzFsCfAH7BCGfT3PhMURTltVLPxAxJQ90hRAB79PePfEMYDLBHNSL3Bt0d98faazNADzYeQbc7BIfzBsGx1EcTj5qoqo5GURQl4GqvLw3fNQhzWD6Xf12RyXcEJ1OXGx3Jzzgdypyih0Xl7FKHNztUWwl0yXjAaX/+qJVk1NEoinJtmMRyDqEPAggRR1+rfV973bclyq7x3jfK7nEePT00vu+KljYIkUd0dqZHD/R872uv2xzfZNTRKIpyDdQjilukj6bd115/QnA2dUMfjXt94mW9TJ9ekeZEy6LxfYHTFNsTzn+PRXCMMbI4tshpnn+PdqdVL/ceVf9RHdM47oARNLdyVhRFWSse3SmdMas3Fzh1JEBl+N81Po/9L3UuyQeCwfeoBgv8gdNoIg5GqI8ki0ONtzgfYfYB7YMXdjidw1OnvnpzgfPffCh1NDi/rjoYQFGUV0m9/2MKOwTDX+cdzp3MHzh3MkN5aZT9hNOoJUYx9cghDjVuOp8uJwMEB/JtgD47nP/mt+X5mk6mbX22XjSiURTlmtggOBzT+Hxfe72rfb9HN1uEKGOLysk8IziBe3TPFxwqH6hWnwaq0V5t8m5LPd6iimweMHxJmC3OO/odzh2UQfWbY+RUP98DEqbD/D+Pn5omN9MOzgAAAABJRU5ErkJggg==';

export default fp(async (app) => {
    const theme = new SwaggerTheme();

    const host = process.env.SRV_BASE_URL || 'http://localhost:3333';

    app.register(fastifySwagger, {
        openapi: {
            info: {
                title: 'Partiu! Tickets',
                description: 'The Partiu! Tickets official api reference.',
                version: '1.0.0',
            },
            tags: [
                { name: 'Auth', description: 'Auth related routes' },
                { name: 'Users', description: 'User related routes' },
                { name: 'Categories', description: 'Category related routes' },
                { name: 'Events', description: 'Event related routes' },
                { name: 'Store', description: 'Public store related routes' },
                { name: 'Ticket Types', description: 'Ticket Types related routes' },
                { name: 'Ticket Offers', description: 'Ticket Offers related routes' },
            ],
            servers: [
                {
                    url: host,
                    description: 'Development Server',
                },
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    },
                },
            },
        },
        transform: jsonSchemaTransform,
    });

    app.register(fastifySwaggerUi, {
        routePrefix: '/docs',
        theme: {
            title: 'API Reference - Partiu! Tickets',
            css: [{ filename: 'theme.css', content: theme.getBuffer(SwaggerThemeNameEnum.DARK) }],
        },
        logo: {
            type: 'image/png',
            content: Buffer.from(logo, 'base64'),
        },
    });
});
