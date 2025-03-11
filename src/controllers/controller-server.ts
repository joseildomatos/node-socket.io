import path from 'path';

var controllerAPI: any = {};

/////////////  Rota dos controllers  /////////////
controllerAPI.Home = (req: any, res: { send: (arg0: { request_cliente: {}; }) => void; }, next: any) => { res.send({ "request_cliente": {} }); };
controllerAPI.Teste = (req: any, res: { sendFile: (arg0: string) => void; }, next: any) => { res.sendFile(path.resolve('src/views/teste-client.html')); };
controllerAPI.EmailSocket = (req: any, res: any, next: any) => { EmitirNotificacoes("EmailSocket", req, res, next); };
controllerAPI.GlobalSocket = (req: any, res: any, next: any) => { EmitirNotificacoes("MonitorGlobal", req, res, next); };

///////////////  Função principal  ////////////////
function EmitirNotificacoes(MonitorOuvinte: string, req: { app: { get: (arg0: string) => any; }; query: {}; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { request_cliente: string | { err: any; }; }): any; new(): any; }; }; send: (arg0: string) => void; }, next: any) {
     try {
          if (MonitorOuvinte === 'EmailSocket') {
               //    chama a api;
               //    realializa o retorno
          }
          else if (MonitorOuvinte === 'MonitorGlobal') {
               const io = req.app.get('io');
               if (Object.keys(req.query).length === 0)
                    return res.status(500).send({ "request_cliente": 'nenhum parametro informado' });

               const params_RequestURL = JSON.parse(JSON.stringify(req.query));
               let params_RequestURLParse = {};
               for (var key in params_RequestURL)
                    params_RequestURLParse[key.trim()] = (params_RequestURL[key].toString().trim()).trim();

               io.emit(MonitorOuvinte, params_RequestURLParse);
               res.send(JSON.stringify(params_RequestURLParse));
          }
     } catch (err) {
          return res.status(500).send({ "request_cliente": { err } });
     }
};

module.exports = controllerAPI;
