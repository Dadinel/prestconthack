#Include 'Protheus.ch'
#Include 'FWMVCDef.ch'

/*/{Protheus.doc} PrestCont
Cadastro do alias ZA1
@author daniel.mendes
@since 01/12/16
@version 1.0 
@return Nil, função sem retorno
@example PrestCont()
/*/
Function PrestCont()
Local oBrowse := Nil

oBrowse := FwMBrowse():New()
oBrowse:SetAlias( 'ZA1' )
oBrowse:Activate()
oBrowse:DeActivate()
oBrowse:Destroy()
oBrowse := Nil

Return Nil

/*/{Protheus.doc} MenuDef
Definição das opções de menu
@author daniel.mendes
@since 01/12/16
@version 1.0 
@return aRotina , Array contendo as opções de menu
@example MenuDef()
/*/
Static Function MenuDef()
Local aRotina := {}

Add Option aRotina Title 'Visualizar' Action 'ViewDef.PrestCont' Operation MODEL_OPERATION_VIEW   Access 0
Add Option aRotina Title 'Incluir'    Action 'ViewDef.PrestCont' Operation MODEL_OPERATION_INSERT Access 0
Add Option aRotina Title 'Alterar'    Action 'ViewDef.PrestCont' Operation MODEL_OPERATION_UPDATE Access 0
Add Option aRotina Title 'Excluir'    Action 'ViewDef.PrestCont' Operation MODEL_OPERATION_DELETE Access 0
Add Option aRotina Title 'Imprimir'   Action 'ViewDef.PrestCont' Operation 8                      Access 0
Add Option aRotina Title 'Copiar'     Action 'ViewDef.PrestCont' Operation 9                      Access 0

Return aRotina

/*/{Protheus.doc} ModelDef
Definição do modelo de dados
@author daniel.mendes
@since 01/12/16
@version 1.0 
@return oModel, objeto do modelo de dados
@example ModelDef()
/*/
Static Function ModelDef()
Local oModel    := Nil
Local oStrctZA1 := Nil

oStrctZA1 := FwFormStruct( 1 , 'ZA1' , /*bFiltro*/ )
oModel    := MPFormModel():New( 'MdlMvcZA1' , /*bPre*/ , /*bPos*/, /*bCommit*/, /*bCancel*/ )

oModel:AddFields( 'M01ZA1' , /*Owner*/ , oStrctZA1 , /*bPre*/ , /*bPos*/ , /*bLoad*/ )

Return oModel

/*/{Protheus.doc} ViewDef
Definição da interface
@author daniel.mendes
@since 01/12/16
@version 1.0 
@return oView, objeto da interface
@example ViewDef()
/*/
Static Function ViewDef()
Local oModel    := Nil
Local oView     := Nil
Local oStrctZA1 := Nil

oModel    := FwLoadModel( 'PrestCont' )
oView     := FwFormView():New() 
oStrctZA1 := FwFormStruct( 2 , 'ZA1' , /*bFiltro*/ )

oView:SetModel( oModel )
oView:AddField( 'V01ZA1' , oStrctZA1 , 'M01ZA1' )
oView:CreateHorizontalBox( 'VwZA1' , 100 )
oView:SetOwnerView( 'V01ZA1' , 'VwZA1' )

Return oView
