import QtQuick 2.2
import QtQuick.Controls 1.4
import QtWebView 1.0

import QtQuick.Layouts 1.1
import QtQuick.Controls.Styles 1.2

WebView {
    id: webView
    scale: 1
    signal qmlLoadFinished(string url)
    //objectName: "webView"
    //url: "file:///android_asset/files/index.html"

    // Informa termino da carga da pagina
    // aproveito o Signal e envio a URL ao C++
    onLoadProgressChanged: {
        if (loadProgress == 100){
            qmlLoadFinished(url)
        }
    }

    function _runJavaScript(js){
        webView.runJavaScript(js)
    }

    function _goBack(){
        if (webView.canGoBack){
            webView.goBack()
        } 
    }

    function _goForward(){
        if (webView.canGoForward){
            webView.goForward()
        } 
    }
}
