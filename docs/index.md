# EasyEDA Pro API 文档索引

> 本文件由 `scripts/build-docs.mjs` 自动生成，请勿手动编辑。
> 机器可读版本见 [`api-index.json`](./api-index.json)。

全局变量 `eda` 是 `EDA` 类的实例，所有 API 通过 `eda.xxx` 调用，例如：

```js
await eda.dmt_Project.getCurrentProjectInfo();
await eda.sys_WebSocket.register();
```

## 总览

| 类别 | 数量 | 说明 |
|------|------|------|
| 类 (Classes) | 127 | 包含全部方法与属性 |
| 枚举 (Enums) | 73 | 枚举成员与取值 |
| 接口 (Interfaces) | 122 | 包含全部属性 |
| 类型别名 (Type Aliases) | 24 | 结构化类型定义 |
| **合计** | **346** | |

## 类 (Classes)

| 名称 | 描述 | 成员数 | 文档 |
|------|------|--------|------|
| `DMT_Board` | Document tree / Board management class | 7 | [md](../references/classes/DMT_Board.md) |
| `DMT_EditorControl` | Document tree / Editor control class | 26 | [md](../references/classes/DMT_EditorControl.md) |
| `DMT_Event` | Document tree / event class | 3 | [md](../references/classes/DMT_Event.md) |
| `DMT_Folder` | Document tree / Folder class | 7 | [md](../references/classes/DMT_Folder.md) |
| `DMT_Panel` | Document tree / Panel management class | 7 | [md](../references/classes/DMT_Panel.md) |
| `DMT_Pcb` | Document tree / PCB management class | 7 | [md](../references/classes/DMT_Pcb.md) |
| `DMT_Project` | Document tree / Project management class | 7 | [md](../references/classes/DMT_Project.md) |
| `DMT_Schematic` | Document tree / Schematic management class | 18 | [md](../references/classes/DMT_Schematic.md) |
| `DMT_SelectControl` | Document tree / selection control class | 1 | [md](../references/classes/DMT_SelectControl.md) |
| `DMT_Team` | Document tree / Team class | 3 | [md](../references/classes/DMT_Team.md) |
| `DMT_Workspace` | Document tree / Workspace class | 3 | [md](../references/classes/DMT_Workspace.md) |
| `eda` |  | 0 | [md](../references/classes/EDA.md) |
| `IPCB_ComplexPolygon` | Complex polygon | 9 | [md](../references/classes/IPCB_ComplexPolygon.md) |
| `IPCB_Polygon` | Single polygon | 3 | [md](../references/classes/IPCB_Polygon.md) |
| `IPCB_PrimitiveArc` | Arc line primitive | 52 | [md](../references/classes/IPCB_PrimitiveArc.md) |
| `IPCB_PrimitiveAttribute` | Property primitive | 61 | [md](../references/classes/IPCB_PrimitiveAttribute.md) |
| `IPCB_PrimitiveComponent` | Device primitive | 61 | [md](../references/classes/IPCB_PrimitiveComponent.md) |
| `IPCB_PrimitiveComponentPad` | Device pad primitive | 19 | [md](../references/classes/IPCB_PrimitiveComponentPad.md) |
| `IPCB_PrimitiveDimension` | Dimension primitive | 33 | [md](../references/classes/IPCB_PrimitiveDimension.md) |
| `IPCB_PrimitiveFill` | Fill primitive | 37 | [md](../references/classes/IPCB_PrimitiveFill.md) |
| `IPCB_PrimitiveImage` | Image primitive | 36 | [md](../references/classes/IPCB_PrimitiveImage.md) |
| `IPCB_PrimitiveLine` | Line primitive | 46 | [md](../references/classes/IPCB_PrimitiveLine.md) |
| `IPCB_PrimitiveObject` | Binary embedded object primitive | 41 | [md](../references/classes/IPCB_PrimitiveObject.md) |
| `IPCB_PrimitivePad` | Pad primitive | 83 | [md](../references/classes/IPCB_PrimitivePad.md) |
| `IPCB_PrimitivePolyline` | Polyline primitive | 34 | [md](../references/classes/IPCB_PrimitivePolyline.md) |
| `IPCB_PrimitivePour` | Copper border primitive | 50 | [md](../references/classes/IPCB_PrimitivePour.md) |
| `IPCB_PrimitivePoured` | Copper fill primitive | 11 | [md](../references/classes/IPCB_PrimitivePoured.md) |
| `IPCB_PrimitiveRegion` | Region primitive | 37 | [md](../references/classes/IPCB_PrimitiveRegion.md) |
| `IPCB_PrimitiveString` | Text primitive | 51 | [md](../references/classes/IPCB_PrimitiveString.md) |
| `IPCB_PrimitiveVia` | Via primitive | 41 | [md](../references/classes/IPCB_PrimitiveVia.md) |
| `ISCH_PrimitiveArc` | Arc primitive | 41 | [md](../references/classes/ISCH_PrimitiveArc.md) |
| `ISCH_PrimitiveAttribute` | Property primitive | 57 | [md](../references/classes/ISCH_PrimitiveAttribute.md) |
| `ISCH_PrimitiveBus` | Bus primitive | 24 | [md](../references/classes/ISCH_PrimitiveBus.md) |
| `ISCH_PrimitiveCbbSymbolComponent` | Reuse block symbol primitive | 7 | [md](../references/classes/ISCH_PrimitiveCbbSymbolComponent.md) |
| `ISCH_PrimitiveCircle` | Circle primitive | 35 | [md](../references/classes/ISCH_PrimitiveCircle.md) |
| `ISCH_PrimitiveComponent` | Device primitive | 72 | [md](../references/classes/ISCH_PrimitiveComponent.md) |
| `ISCH_PrimitiveComponentPin` | Device pin primitive | 6 | [md](../references/classes/ISCH_PrimitiveComponentPin.md) |
| `ISCH_PrimitiveObject` | Binary embedded object primitive | 35 | [md](../references/classes/ISCH_PrimitiveObject.md) |
| `ISCH_PrimitivePin` | Pin primitive | 59 | [md](../references/classes/ISCH_PrimitivePin.md) |
| `ISCH_PrimitivePolygon` | Polygon (polyline) primitive | 26 | [md](../references/classes/ISCH_PrimitivePolygon.md) |
| `ISCH_PrimitiveRectangle` | Rectangle primitive | 44 | [md](../references/classes/ISCH_PrimitiveRectangle.md) |
| `ISCH_PrimitiveText` | Text primitive | 44 | [md](../references/classes/ISCH_PrimitiveText.md) |
| `ISCH_PrimitiveWire` | Wire primitive | 24 | [md](../references/classes/ISCH_PrimitiveWire.md) |
| `LIB_3DModel` | Comprehensive library / 3D model class | 12 | [md](../references/classes/LIB_3DModel.md) |
| `LIB_Cbb` | Comprehensive library / reuse block class | 18 | [md](../references/classes/LIB_Cbb.md) |
| `LIB_Classification` | Comprehensive library / library classification index class | 8 | [md](../references/classes/LIB_Classification.md) |
| `LIB_Device` | Comprehensive library / device class | 18 | [md](../references/classes/LIB_Device.md) |
| `LIB_Footprint` | Comprehensive library / footprint class | 21 | [md](../references/classes/LIB_Footprint.md) |
| `LIB_LibrariesList` | Comprehensive library / library list class | 11 | [md](../references/classes/LIB_LibrariesList.md) |
| `LIB_PanelLibrary` | Comprehensive library / panel library class | 16 | [md](../references/classes/LIB_PanelLibrary.md) |
| `LIB_SelectControl` | Comprehensive library / selection control class | 1 | [md](../references/classes/LIB_SelectControl.md) |
| `LIB_SimulationModel` | Comprehensive library / simulation model class | 12 | [md](../references/classes/LIB_SimulationModel.md) |
| `LIB_Symbol` | Comprehensive library / symbol class | 21 | [md](../references/classes/LIB_Symbol.md) |
| `PCB_Document` | PCB &amp; footprint / document operation class | 26 | [md](../references/classes/PCB_Document.md) |
| `PCB_Drc` | PCB &amp; footprint / design rule check (DRC) class | 46 | [md](../references/classes/PCB_Drc.md) |
| `PCB_Event` | PCB &amp; footprint / event class | 9 | [md](../references/classes/PCB_Event.md) |
| `PCB_Layer` | PCB &amp; footprint / layer operation class | 25 | [md](../references/classes/PCB_Layer.md) |
| `PCB_ManufactureData` | PCB &amp; footprint / manufacture data class | 50 | [md](../references/classes/PCB_ManufactureData.md) |
| `PCB_MathPolygon` | PCB &amp; footprint / polygon math class | 20 | [md](../references/classes/PCB_MathPolygon.md) |
| `PCB_Net` | PCB &amp; footprint / net class | 18 | [md](../references/classes/PCB_Net.md) |
| `PCB_Primitive` | PCB &amp; footprint / primitive class | 3 | [md](../references/classes/PCB_Primitive.md) |
| `PCB_PrimitiveArc` | PCB &amp; footprint / arc line primitive class | 15 | [md](../references/classes/PCB_PrimitiveArc.md) |
| `PCB_PrimitiveAttribute` | PCB &amp; footprint / property primitive class | 13 | [md](../references/classes/PCB_PrimitiveAttribute.md) |
| `PCB_PrimitiveComponent` | PCB &amp; footprint / device primitive class | 20 | [md](../references/classes/PCB_PrimitiveComponent.md) |
| `PCB_PrimitiveDimension` | PCB &amp; footprint / dimension primitive class | 15 | [md](../references/classes/PCB_PrimitiveDimension.md) |
| `PCB_PrimitiveFill` | PCB &amp; footprint / fill primitive class | 17 | [md](../references/classes/PCB_PrimitiveFill.md) |
| `PCB_PrimitiveImage` | PCB &amp; footprint / image primitive class | 19 | [md](../references/classes/PCB_PrimitiveImage.md) |
| `PCB_PrimitiveLine` | PCB &amp; footprint / line primitive class | 15 | [md](../references/classes/PCB_PrimitiveLine.md) |
| `PCB_PrimitiveObject` | PCB &amp; footprint / binary embedded object primitive class | 15 | [md](../references/classes/PCB_PrimitiveObject.md) |
| `PCB_PrimitivePad` | PCB &amp; footprint / pad primitive class | 15 | [md](../references/classes/PCB_PrimitivePad.md) |
| `PCB_PrimitivePolyline` | PCB &amp; footprint / polyline primitive class | 17 | [md](../references/classes/PCB_PrimitivePolyline.md) |
| `PCB_PrimitivePour` | PCB &amp; footprint / copper border primitive class | 17 | [md](../references/classes/PCB_PrimitivePour.md) |
| `PCB_PrimitivePoured` | PCB &amp; footprint / copper fill primitive class | 10 | [md](../references/classes/PCB_PrimitivePoured.md) |
| `PCB_PrimitiveRegion` | PCB &amp; footprint / forbidden region and constrained region primitive class | 17 | [md](../references/classes/PCB_PrimitiveRegion.md) |
| `PCB_PrimitiveString` | PCB &amp; footprint / text primitive class | 15 | [md](../references/classes/PCB_PrimitiveString.md) |
| `PCB_PrimitiveVia` | PCB &amp; footprint / via primitive class | 15 | [md](../references/classes/PCB_PrimitiveVia.md) |
| `PCB_RayTracerEngine` | PCB &amp; footprint / ray tracer engine class | 6 | [md](../references/classes/PCB_RayTracerEngine.md) |
| `PCB_SelectControl` | PCB &amp; footprint / selection control class | 8 | [md](../references/classes/PCB_SelectControl.md) |
| `PNL_Document` | Panel / document operation class | 1 | [md](../references/classes/PNL_Document.md) |
| `SCH_Document` | Schematic &amp; symbol / document operation class | 9 | [md](../references/classes/SCH_Document.md) |
| `SCH_Drc` | Schematic &amp; symbol / design rule check (DRC) class | 2 | [md](../references/classes/SCH_Drc.md) |
| `SCH_Event` | Schematic &amp; symbol / event class | 5 | [md](../references/classes/SCH_Event.md) |
| `SCH_ManufactureData` | Schematic &amp; symbol / manufacture data class | 15 | [md](../references/classes/SCH_ManufactureData.md) |
| `SCH_Net` | Schematic &amp; symbol / net class | 4 | [md](../references/classes/SCH_Net.md) |
| `SCH_Netlist` | Schematic &amp; symbol / netlist class | 3 | [md](../references/classes/SCH_Netlist.md) |
| `SCH_Primitive` | Schematic &amp; symbol / primitive class | 4 | [md](../references/classes/SCH_Primitive.md) |
| `SCH_PrimitiveArc` | Schematic &amp; symbol / arc primitive class | 15 | [md](../references/classes/SCH_PrimitiveArc.md) |
| `SCH_PrimitiveAttribute` | Schematic &amp; symbol / property primitive class | 12 | [md](../references/classes/SCH_PrimitiveAttribute.md) |
| `SCH_PrimitiveBus` | Schematic &amp; symbol / bus primitive class | 15 | [md](../references/classes/SCH_PrimitiveBus.md) |
| `SCH_PrimitiveCircle` | Schematic &amp; symbol / circle primitive class | 15 | [md](../references/classes/SCH_PrimitiveCircle.md) |
| `SCH_PrimitiveComponent` | Schematic &amp; symbol / device primitive class | 36 | [md](../references/classes/SCH_PrimitiveComponent.md) |
| `SCH_PrimitiveObject` | Schematic &amp; symbol / binary embedded object primitive class | 15 | [md](../references/classes/SCH_PrimitiveObject.md) |
| `SCH_PrimitivePin` | Schematic &amp; symbol / pin primitive class | 20 | [md](../references/classes/SCH_PrimitivePin.md) |
| `SCH_PrimitivePolygon` | Schematic &amp; symbol / polygon (polyline) primitive class | 15 | [md](../references/classes/SCH_PrimitivePolygon.md) |
| `SCH_PrimitiveRectangle` | Schematic &amp; symbol / rectangle primitive class | 15 | [md](../references/classes/SCH_PrimitiveRectangle.md) |
| `SCH_PrimitiveText` | Schematic &amp; symbol / text primitive class | 15 | [md](../references/classes/SCH_PrimitiveText.md) |
| `SCH_PrimitiveWire` | Schematic &amp; symbol / wire primitive class | 15 | [md](../references/classes/SCH_PrimitiveWire.md) |
| `SCH_SelectControl` | Schematic &amp; symbol / selection control class | 10 | [md](../references/classes/SCH_SelectControl.md) |
| `SCH_SimulationEngine` | Schematic &amp; symbol / simulation engine class | 1 | [md](../references/classes/SCH_SimulationEngine.md) |
| `SCH_Utils` | Schematic &amp; symbol / utility class | 3 | [md](../references/classes/SCH_Utils.md) |
| `SYS_ClientUrl` | System / external request class | 1 | [md](../references/classes/SYS_ClientUrl.md) |
| `SYS_Dialog` | System / dialog class | 6 | [md](../references/classes/SYS_Dialog.md) |
| `SYS_Environment` | System / runtime environment class | 11 | [md](../references/classes/SYS_Environment.md) |
| `SYS_FileManager` | System / file manager class | 28 | [md](../references/classes/SYS_FileManager.md) |
| `SYS_FileSystem` | System / file system interaction class | 17 | [md](../references/classes/SYS_FileSystem.md) |
| `SYS_FontManager` | System / font manager class | 3 | [md](../references/classes/SYS_FontManager.md) |
| `SYS_FormatConversion` | System / format conversion (Chameleon) class | 4 | [md](../references/classes/SYS_FormatConversion.md) |
| `SYS_HeaderMenu` | System / header menu class | 7 | [md](../references/classes/SYS_HeaderMenu.md) |
| `SYS_I18n` | System / multilingual class | 10 | [md](../references/classes/SYS_I18n.md) |
| `SYS_IFrame` | System / iframe window class | 5 | [md](../references/classes/SYS_IFrame.md) |
| `SYS_LoadingAndProgressBar` | System / loading and progress bar class | 4 | [md](../references/classes/SYS_LoadingAndProgressBar.md) |
| `SYS_Log` | System / log class | 5 | [md](../references/classes/SYS_Log.md) |
| `SYS_Math` | System / math class | 17 | [md](../references/classes/SYS_Math.md) |
| `SYS_Message` | System / message notification class | 4 | [md](../references/classes/SYS_Message.md) |
| `SYS_MessageBox` | > Warning: This API is now obsolete. | 5 | [md](../references/classes/SYS_MessageBox.md) |
| `SYS_MessageBus` | System / message bus class | 18 | [md](../references/classes/SYS_MessageBus.md) |
| `SYS_PanelControl` | System / panel control class | 12 | [md](../references/classes/SYS_PanelControl.md) |
| `SYS_RightClickMenu` | System / right-click menu class | 1 | [md](../references/classes/SYS_RightClickMenu.md) |
| `SYS_Setting` | System / settings class | 1 | [md](../references/classes/SYS_Setting.md) |
| `SYS_ShortcutKey` | System / shortcut key class | 7 | [md](../references/classes/SYS_ShortcutKey.md) |
| `SYS_Storage` | System / storage class | 6 | [md](../references/classes/SYS_Storage.md) |
| `SYS_Timer` | System / timer class | 4 | [md](../references/classes/SYS_Timer.md) |
| `SYS_ToastMessage` | > Warning: This API is now obsolete. | 3 | [md](../references/classes/SYS_ToastMessage.md) |
| `SYS_Tool` | System / tool class | 2 | [md](../references/classes/SYS_Tool.md) |
| `SYS_Unit` | System / unit class | 7 | [md](../references/classes/SYS_Unit.md) |
| `SYS_WebSocket` | System / WebSocket class | 3 | [md](../references/classes/SYS_WebSocket.md) |
| `SYS_Window` | System / window class | 13 | [md](../references/classes/SYS_Window.md) |

## 枚举 (Enums)

| 名称 | 描述 | 成员数 | 文档 |
|------|------|--------|------|
| `EDMT_EditorDocumentType` | Editor document type | 0 | [md](../references/enums/EDMT_EditorDocumentType.md) |
| `EDMT_EditorSplitScreenDirection` | Editor split screen direction | 0 | [md](../references/enums/EDMT_EditorSplitScreenDirection.md) |
| `EDMT_EditorTabEventType` | Editor tab event type | 3 | [md](../references/enums/EDMT_EditorTabEventType.md) |
| `EDMT_IndicatorMarkerType` | Indicator marker type | 0 | [md](../references/enums/EDMT_IndicatorMarkerType.md) |
| `EDMT_ItemType` | Document tree project type | 0 | [md](../references/enums/EDMT_ItemType.md) |
| `EDMT_ProjectCollaborationMode` | Project collaboration mode | 0 | [md](../references/enums/EDMT_ProjectCollaborationMode.md) |
| `ELIB_DeviceJlcLibraryCategory` | EasyEDA SMT library category | 0 | [md](../references/enums/ELIB_DeviceJlcLibraryCategory.md) |
| `ELIB_LibraryType` | Comprehensive library library type | 0 | [md](../references/enums/ELIB_LibraryType.md) |
| `ELIB_PreviewType` | Preview view type | 0 | [md](../references/enums/ELIB_PreviewType.md) |
| `ELIB_SimulationModelType` | Simulation model type | 0 | [md](../references/enums/ELIB_SimulationModelType.md) |
| `ELIB_SymbolType` | Symbol type | 0 | [md](../references/enums/ELIB_SymbolType.md) |
| `EPCB_AutoRoutingCornerStyle` | Auto routing corner style | 0 | [md](../references/enums/EPCB_AutoRoutingCornerStyle.md) |
| `EPCB_AutoRoutingExistingPrimitiveMode` | How auto routing handles existing wires/vias | 0 | [md](../references/enums/EPCB_AutoRoutingExistingPrimitiveMode.md) |
| `EPCB_AutoRoutingOptimization` | Auto routing optimization priority | 0 | [md](../references/enums/EPCB_AutoRoutingOptimization.md) |
| `EPCB_DocumentCanvasUpdateCalculationActiveStatus` | Canvas update calculation function status | 0 | [md](../references/enums/EPCB_DocumentCanvasUpdateCalculationActiveStatus.md) |
| `EPCB_DocumentRatlineCalculatingActiveStatus` | > Warning: This API is now obsolete. | 0 | [md](../references/enums/EPCB_DocumentRatlineCalculatingActiveStatus.md) |
| `EPCB_InactiveLayerDisplayMode` | Inactive layer display mode | 0 | [md](../references/enums/EPCB_InactiveLayerDisplayMode.md) |
| `EPCB_LayerColorConfiguration` | Layer color configuration | 0 | [md](../references/enums/EPCB_LayerColorConfiguration.md) |
| `EPCB_LayerId` | Layer ID | 0 | [md](../references/enums/EPCB_LayerId.md) |
| `EPCB_LayerStatus` | Layer status | 0 | [md](../references/enums/EPCB_LayerStatus.md) |
| `EPCB_LayerType` | Layer type | 0 | [md](../references/enums/EPCB_LayerType.md) |
| `EPCB_MouseEventType` | Mouse event type | 0 | [md](../references/enums/EPCB_MouseEventType.md) |
| `EPCB_NetEventType` | Net event type | 0 | [md](../references/enums/EPCB_NetEventType.md) |
| `EPCB_PcbPlateType` | PCB plate type | 0 | [md](../references/enums/EPCB_PcbPlateType.md) |
| `EPCB_PdfOutputMethod` | PDF output method | 0 | [md](../references/enums/EPCB_PdfOutputMethod.md) |
| `EPCB_PrimitiveArcInteractiveMode` | Arc interaction mode | 0 | [md](../references/enums/EPCB_PrimitiveArcInteractiveMode.md) |
| `EPCB_PrimitiveDimensionType` | Dimension type | 0 | [md](../references/enums/EPCB_PrimitiveDimensionType.md) |
| `EPCB_PrimitiveEventType` | Primitive event type | 0 | [md](../references/enums/EPCB_PrimitiveEventType.md) |
| `EPCB_PrimitiveFillMode` | Fill primitive fill mode | 0 | [md](../references/enums/EPCB_PrimitiveFillMode.md) |
| `EPCB_PrimitivePadHeatWeldingConnectionMethod` | Pad heat welding connection method | 0 | [md](../references/enums/EPCB_PrimitivePadHeatWeldingConnectionMethod.md) |
| `EPCB_PrimitivePadHoleType` | Pad drilling type | 0 | [md](../references/enums/EPCB_PrimitivePadHoleType.md) |
| `EPCB_PrimitivePadShapeType` | Pad shape type | 0 | [md](../references/enums/EPCB_PrimitivePadShapeType.md) |
| `EPCB_PrimitivePadType` | Pad type | 0 | [md](../references/enums/EPCB_PrimitivePadType.md) |
| `EPCB_PrimitivePourFillMethod` | Copper fill method | 0 | [md](../references/enums/EPCB_PrimitivePourFillMethod.md) |
| `EPCB_PrimitiveRegionRuleType` | Region primitive region rule type | 1 | [md](../references/enums/EPCB_PrimitiveRegionRuleType.md) |
| `EPCB_PrimitiveStringAlignMode` | Text alignment mode | 0 | [md](../references/enums/EPCB_PrimitiveStringAlignMode.md) |
| `EPCB_PrimitiveType` | Primitive type | 0 | [md](../references/enums/EPCB_PrimitiveType.md) |
| `EPCB_PrimitiveViaType` | Via type | 0 | [md](../references/enums/EPCB_PrimitiveViaType.md) |
| `ESCH_DynamicSimulationEnginePullEventType` | Dynamic simulation engine pull event type | 0 | [md](../references/enums/ESCH_DynamicSimulationEnginePullEventType.md) |
| `ESCH_DynamicSimulationEnginePushEventType` | Dynamic simulation engine push event type | 0 | [md](../references/enums/ESCH_DynamicSimulationEnginePushEventType.md) |
| `ESCH_ExportDocumentFileType` | Export document file type | 0 | [md](../references/enums/ESCH_ExportDocumentFileType.md) |
| `ESCH_MouseEventType` | Mouse event type | 0 | [md](../references/enums/ESCH_MouseEventType.md) |
| `ESCH_PrimitiveComponentType` | Device type | 0 | [md](../references/enums/ESCH_PrimitiveComponentType.md) |
| `ESCH_PrimitiveEventType` | Primitive event type | 0 | [md](../references/enums/ESCH_PrimitiveEventType.md) |
| `ESCH_PrimitiveFillStyle` | Fill style | 0 | [md](../references/enums/ESCH_PrimitiveFillStyle.md) |
| `ESCH_PrimitiveLineType` | Line type | 0 | [md](../references/enums/ESCH_PrimitiveLineType.md) |
| `ESCH_PrimitivePinShape` | Pin shape | 0 | [md](../references/enums/ESCH_PrimitivePinShape.md) |
| `ESCH_PrimitivePinType` | Pin type | 0 | [md](../references/enums/ESCH_PrimitivePinType.md) |
| `ESCH_PrimitiveTextAlignMode` | Text alignment mode | 0 | [md](../references/enums/ESCH_PrimitiveTextAlignMode.md) |
| `ESCH_PrimitiveType` | Primitive type | 0 | [md](../references/enums/ESCH_PrimitiveType.md) |
| `ESCH_SimulationNetlistType` | Simulation netlist type | 0 | [md](../references/enums/ESCH_SimulationNetlistType.md) |
| `ESCH_SpiceSimulationEnginePullEventType` | Spice simulation engine pull event type | 0 | [md](../references/enums/ESCH_SpiceSimulationEnginePullEventType.md) |
| `ESCH_SpiceSimulationEnginePushEventType` | Spice simulation engine push event type | 0 | [md](../references/enums/ESCH_SpiceSimulationEnginePushEventType.md) |
| `ESYS_BottomPanelTab` | Bottom panel tab | 0 | [md](../references/enums/ESYS_BottomPanelTab.md) |
| `ESYS_HeaderMenuEnvironment` | Header menu environment | 0 | [md](../references/enums/ESYS_HeaderMenuEnvironment.md) |
| `ESYS_ImportProjectBoardOutlineSource` | Import project board outline source | 0 | [md](../references/enums/ESYS_ImportProjectBoardOutlineSource.md) |
| `ESYS_ImportProjectImportOption` | Import project import option | 0 | [md](../references/enums/ESYS_ImportProjectImportOption.md) |
| `ESYS_ImportProjectSchematicObjectStyle` | Import project schematic primitive style | 0 | [md](../references/enums/ESYS_ImportProjectSchematicObjectStyle.md) |
| `ESYS_ImportProjectViaSolderMaskExpansion` | Import project via solder mask extension | 0 | [md](../references/enums/ESYS_ImportProjectViaSolderMaskExpansion.md) |
| `ESYS_LeftPanelTab` | Left panel tab | 0 | [md](../references/enums/ESYS_LeftPanelTab.md) |
| `ESYS_LogType` | Log type | 0 | [md](../references/enums/ESYS_LogType.md) |
| `ESYS_NetlistType` | Netlist type | 0 | [md](../references/enums/ESYS_NetlistType.md) |
| `ESYS_RightPanelTab` | Right panel tab | 0 | [md](../references/enums/ESYS_RightPanelTab.md) |
| `ESYS_ShortcutKeyEffectiveEditorRange` | Effective page range of the shortcut key | 0 | [md](../references/enums/ESYS_ShortcutKeyEffectiveEditorRange.md) |
| `ESYS_ShortcutKeyEffectiveEditorScene` | Effective scene range of the shortcut key | 0 | [md](../references/enums/ESYS_ShortcutKeyEffectiveEditorScene.md) |
| `ESYS_StartPageQuickStartItem` | Start page quick start item | 0 | [md](../references/enums/ESYS_StartPageQuickStartItem.md) |
| `ESYS_Theme` | Theme | 0 | [md](../references/enums/ESYS_Theme.md) |
| `ESYS_ToastMessageType` | Toast message type | 0 | [md](../references/enums/ESYS_ToastMessageType.md) |
| `ESYS_Unit` | Unit | 0 | [md](../references/enums/ESYS_Unit.md) |
| `ESYS_WindowEventType` | Window event type | 0 | [md](../references/enums/ESYS_WindowEventType.md) |
| `ESYS_WindowOpenTarget` | Open window context target | 0 | [md](../references/enums/ESYS_WindowOpenTarget.md) |
| `NetportDeviceName` | 网络端口符号对应的器件名称 | 0 | [md](../references/enums/NetportDeviceName.md) |
| `SchToolBarDeviceName` | 悬浮框特殊符号对应的器件名称 | 0 | [md](../references/enums/SchToolBarDeviceName.md) |

## 接口 (Interfaces)

| 名称 | 描述 | 成员数 | 文档 |
|------|------|--------|------|
| `BoardProps` | 分组面板：带标题的可折叠/分组容器 | 5 | [md](../references/interfaces/BoardProps.md) |
| `ButtonProps` | 按钮组件：可点击触发的操作按钮 | 6 | [md](../references/interfaces/ButtonProps.md) |
| `CheckBoxProps` | 复选框组件：可勾选的状态控件 | 6 | [md](../references/interfaces/CheckBoxProps.md) |
| `ComponentPropsMap` | Component name → Props type mapping, serving as the sole source of the `createCo | 36 | [md](../references/interfaces/ComponentPropsMap.md) |
| `DialogProps` | 对话框组件：带标题栏、可拖拽缩放的组合弹窗 | 13 | [md](../references/interfaces/DialogProps.md) |
| `FlexItemProps` | Flex 子项：Flex 布局中的单个子元素 | 4 | [md](../references/interfaces/FlexItemProps.md) |
| `FlexProps` | 布局容器：灵活的 Flex 布局容器 | 8 | [md](../references/interfaces/FlexProps.md) |
| `GridItemProps` | Grid 子项：网格中的单个子元素 | 5 | [md](../references/interfaces/GridItemProps.md) |
| `GridProps` | 布局容器：固定列数的网格布局容器 | 5 | [md](../references/interfaces/GridProps.md) |
| `IDMT_BoardItem` | Board property | 7 | [md](../references/interfaces/IDMT_BoardItem.md) |
| `IDMT_BriefProjectItem` | Brief project properties | 5 | [md](../references/interfaces/IDMT_BriefProjectItem.md) |
| `IDMT_EditorDocumentItem` | Editor document object | 5 | [md](../references/interfaces/IDMT_EditorDocumentItem.md) |
| `IDMT_EditorSplitScreenItem` | Editor split screen property | 11 | [md](../references/interfaces/IDMT_EditorSplitScreenItem.md) |
| `IDMT_EditorTabItem` | Editor tab | 5 | [md](../references/interfaces/IDMT_EditorTabItem.md) |
| `IDMT_FolderItem` | Folder property | 7 | [md](../references/interfaces/IDMT_FolderItem.md) |
| `IDMT_IndicatorMarkerShape` | Indicator marker shape | 13 | [md](../references/interfaces/IDMT_IndicatorMarkerShape.md) |
| `IDMT_PanelItem` | Panel property | 4 | [md](../references/interfaces/IDMT_PanelItem.md) |
| `IDMT_PcbItem` | PCB property | 5 | [md](../references/interfaces/IDMT_PcbItem.md) |
| `IDMT_ProjectItem` | Project property | 9 | [md](../references/interfaces/IDMT_ProjectItem.md) |
| `IDMT_SchematicItem` | Schematic property | 9 | [md](../references/interfaces/IDMT_SchematicItem.md) |
| `IDMT_SchematicPageItem` | Schematic sheet property | 6 | [md](../references/interfaces/IDMT_SchematicPageItem.md) |
| `IDMT_TeamItem` | Team properties | 4 | [md](../references/interfaces/IDMT_TeamItem.md) |
| `IDMT_WorkspaceItem` | Workspace properties | 3 | [md](../references/interfaces/IDMT_WorkspaceItem.md) |
| `IDesignPortal` | Component tree operation contract. | 5 | [md](../references/interfaces/IDesignPortal.md) |
| `ILIB_3DModelItem` | 3D model property | 7 | [md](../references/interfaces/ILIB_3DModelItem.md) |
| `ILIB_3DModelSearchItem` | Searched 3D model properties | 10 | [md](../references/interfaces/ILIB_3DModelSearchItem.md) |
| `ILIB_CbbItem` | Reuse block property | 9 | [md](../references/interfaces/ILIB_CbbItem.md) |
| `ILIB_CbbSearchItem` | Searched reuse block properties | 10 | [md](../references/interfaces/ILIB_CbbSearchItem.md) |
| `ILIB_ClassificationIndex` | > Warning: This API is now obsolete. | 4 | [md](../references/interfaces/ILIB_ClassificationIndex.md) |
| `ILIB_DeviceAssociationItem` | Device associated symbol, footprint property | 9 | [md](../references/interfaces/ILIB_DeviceAssociationItem.md) |
| `ILIB_DeviceExtendPropertyItem` | Device extension property | 10 | [md](../references/interfaces/ILIB_DeviceExtendPropertyItem.md) |
| `ILIB_DeviceItem` | Device property | 12 | [md](../references/interfaces/ILIB_DeviceItem.md) |
| `ILIB_DevicePropertiesForSearch` | Device parameters that can be used for precise search | 8 | [md](../references/interfaces/ILIB_DevicePropertiesForSearch.md) |
| `ILIB_DeviceSearchItem` | Searched device properties | 24 | [md](../references/interfaces/ILIB_DeviceSearchItem.md) |
| `ILIB_ExtendLibrary3DModelFunctions` | External library 3D model functions | 6 | [md](../references/interfaces/ILIB_ExtendLibrary3DModelFunctions.md) |
| `ILIB_ExtendLibraryCbbFunctions` | External library reuse block functions | 9 | [md](../references/interfaces/ILIB_ExtendLibraryCbbFunctions.md) |
| `ILIB_ExtendLibraryClassificationIndex` | > Warning: This API is now obsolete. | 4 | [md](../references/interfaces/ILIB_ExtendLibraryClassificationIndex.md) |
| `ILIB_ExtendLibraryDeviceFunctions` | External library device functions | 14 | [md](../references/interfaces/ILIB_ExtendLibraryDeviceFunctions.md) |
| `ILIB_ExtendLibraryFootprintFunctions` | External library footprint functions | 6 | [md](../references/interfaces/ILIB_ExtendLibraryFootprintFunctions.md) |
| `ILIB_ExtendLibraryFunctions` | External library functions | 5 | [md](../references/interfaces/ILIB_ExtendLibraryFunctions.md) |
| `ILIB_ExtendLibraryItem` | External library item | 3 | [md](../references/interfaces/ILIB_ExtendLibraryItem.md) |
| `ILIB_ExtendLibraryItemIndex` | External library item index | 2 | [md](../references/interfaces/ILIB_ExtendLibraryItemIndex.md) |
| `ILIB_ExtendLibrarySearchProperty` | External library search property | 4 | [md](../references/interfaces/ILIB_ExtendLibrarySearchProperty.md) |
| `ILIB_ExtendLibrarySearchResult` | External library search result | 5 | [md](../references/interfaces/ILIB_ExtendLibrarySearchResult.md) |
| `ILIB_ExtendLibrarySearchResultDataLine` | External library search result data line | 12 | [md](../references/interfaces/ILIB_ExtendLibrarySearchResultDataLine.md) |
| `ILIB_ExtendLibrarySymbolFunctions` | External library symbol functions | 7 | [md](../references/interfaces/ILIB_ExtendLibrarySymbolFunctions.md) |
| `ILIB_ExtendLibraryUserIndex` | External library user index | 2 | [md](../references/interfaces/ILIB_ExtendLibraryUserIndex.md) |
| `ILIB_FootprintItem` | Footprint property | 7 | [md](../references/interfaces/ILIB_FootprintItem.md) |
| `ILIB_FootprintPropertiesForSearch` | Footprint parameters that can be used for precise search | 1 | [md](../references/interfaces/ILIB_FootprintPropertiesForSearch.md) |
| `ILIB_FootprintSearchItem` | Searched footprint properties | 10 | [md](../references/interfaces/ILIB_FootprintSearchItem.md) |
| `ILIB_LibraryInfo` | Library information | 2 | [md](../references/interfaces/ILIB_LibraryInfo.md) |
| `ILIB_LibraryItem` | Library property | 3 | [md](../references/interfaces/ILIB_LibraryItem.md) |
| `ILIB_PanelLibraryItem` | Panel library property | 7 | [md](../references/interfaces/ILIB_PanelLibraryItem.md) |
| `ILIB_PanelLibrarySearchItem` | Searched panel library properties | 10 | [md](../references/interfaces/ILIB_PanelLibrarySearchItem.md) |
| `ILIB_SimulationModelItem` | Simulation model properties | 10 | [md](../references/interfaces/ILIB_SimulationModelItem.md) |
| `ILIB_SimulationModelSearchItem` | Searched simulation model properties | 10 | [md](../references/interfaces/ILIB_SimulationModelSearchItem.md) |
| `ILIB_SymbolItem` | Symbol property | 10 | [md](../references/interfaces/ILIB_SymbolItem.md) |
| `ILIB_SymbolPropertiesForSearch` | Symbol parameters that can be used for precise search | 1 | [md](../references/interfaces/ILIB_SymbolPropertiesForSearch.md) |
| `ILIB_SymbolSearchItem` | Searched symbol properties | 11 | [md](../references/interfaces/ILIB_SymbolSearchItem.md) |
| `IPCB_AutoLayoutResult` | Auto layout result | 5 | [md](../references/interfaces/IPCB_AutoLayoutResult.md) |
| `IPCB_AutoRoutingProps` | Auto routing props | 6 | [md](../references/interfaces/IPCB_AutoRoutingProps.md) |
| `IPCB_AutoRoutingResult` | Auto routing result | 5 | [md](../references/interfaces/IPCB_AutoRoutingResult.md) |
| `IPCB_BomPropertiesTableColumns` | BOM column properties and sorting rules | 5 | [md](../references/interfaces/IPCB_BomPropertiesTableColumns.md) |
| `IPCB_DifferentialPairItem` | Differential pair properties | 3 | [md](../references/interfaces/IPCB_DifferentialPairItem.md) |
| `IPCB_DiscretizeOptions` | Discretization options | 1 | [md](../references/interfaces/IPCB_DiscretizeOptions.md) |
| `IPCB_DiscretizedPoint` | Discretized point | 2 | [md](../references/interfaces/IPCB_DiscretizedPoint.md) |
| `IPCB_EqualLengthNetGroupItem` | Equal-length net group properties | 3 | [md](../references/interfaces/IPCB_EqualLengthNetGroupItem.md) |
| `IPCB_LayerItem` | Layer properties | 9 | [md](../references/interfaces/IPCB_LayerItem.md) |
| `IPCB_NetClassItem` | Net class property | 3 | [md](../references/interfaces/IPCB_NetClassItem.md) |
| `IPCB_NetInfo` | Net property | 3 | [md](../references/interfaces/IPCB_NetInfo.md) |
| `IPCB_PadPairGroupItem` | Pad pair group properties | 2 | [md](../references/interfaces/IPCB_PadPairGroupItem.md) |
| `IPCB_PadPairMinWireLengthItem` | Pad pair minimum wire length properties | 2 | [md](../references/interfaces/IPCB_PadPairMinWireLengthItem.md) |
| `IPCB_PhysicalStackingConfiguration` | Physical stacking configuration | 3 | [md](../references/interfaces/IPCB_PhysicalStackingConfiguration.md) |
| `IPCB_Primitive` | PCB primitive | 16 | [md](../references/interfaces/IPCB_Primitive.md) |
| `IPCB_PrimitiveAPI` | PCB primitive API | 18 | [md](../references/interfaces/IPCB_PrimitiveAPI.md) |
| `IPCB_PrimitivePadHeatWelding` | Pad thermal relief optimization parameters | 5 | [md](../references/interfaces/IPCB_PrimitivePadHeatWelding.md) |
| `IPCB_PrimitivePouredPourFill` | Copper fill region | 4 | [md](../references/interfaces/IPCB_PrimitivePouredPourFill.md) |
| `IPCB_PrimitiveSolderMaskAndPasteMaskExpansion` | Solder mask / paste mask expansion | 4 | [md](../references/interfaces/IPCB_PrimitiveSolderMaskAndPasteMaskExpansion.md) |
| `IPCB_SubstratePhysicalProperties` | Substrate physical properties | 2 | [md](../references/interfaces/IPCB_SubstratePhysicalProperties.md) |
| `IRawNet` | Raw data - net | 4 | [md](../references/interfaces/IRawNet.md) |
| `IRawPureSchematic` | Raw data - pureSchematic | 3 | [md](../references/interfaces/IRawPureSchematic.md) |
| `IRawSchematic` | Raw data - schematic | 3 | [md](../references/interfaces/IRawSchematic.md) |
| `IRawWire` | Raw data - wire | 5 | [md](../references/interfaces/IRawWire.md) |
| `ISCH_DrcError` | DRC error item | 5 | [md](../references/interfaces/ISCH_DrcError.md) |
| `ISCH_DrcErrorPrimitive` | Primitive involved in a DRC error | 4 | [md](../references/interfaces/ISCH_DrcErrorPrimitive.md) |
| `ISCH_NetInfo` | Net property | 3 | [md](../references/interfaces/ISCH_NetInfo.md) |
| `ISCH_Primitive` | Schematic primitive | 16 | [md](../references/interfaces/ISCH_Primitive.md) |
| `ISCH_PrimitiveAPI` | Schematic primitive API | 18 | [md](../references/interfaces/ISCH_PrimitiveAPI.md) |
| `ISCH_ProjectNetInfo` | Project net property | 5 | [md](../references/interfaces/ISCH_ProjectNetInfo.md) |
| `ISCH_WireInfo` | Wire property | 5 | [md](../references/interfaces/ISCH_WireInfo.md) |
| `ISYS_FileSystemFileList` | File system file path | 6 | [md](../references/interfaces/ISYS_FileSystemFileList.md) |
| `ISYS_HeaderMenuSub1MenuItem` | Top-level secondary menu item | 6 | [md](../references/interfaces/ISYS_HeaderMenuSub1MenuItem.md) |
| `ISYS_HeaderMenuSub2MenuItem` | Top-level tertiary menu item | 4 | [md](../references/interfaces/ISYS_HeaderMenuSub2MenuItem.md) |
| `ISYS_HeaderMenuTopMenuItem` | Top-level primary menu item | 4 | [md](../references/interfaces/ISYS_HeaderMenuTopMenuItem.md) |
| `ISYS_HeaderMenus` | Header menu item | 28 | [md](../references/interfaces/ISYS_HeaderMenus.md) |
| `ISYS_LogLine` | Log line | 3 | [md](../references/interfaces/ISYS_LogLine.md) |
| `ISYS_MathBBox` | BBox (minimum bounding rectangle) | 4 | [md](../references/interfaces/ISYS_MathBBox.md) |
| `ISYS_MathPoint` | Discrete points | 2 | [md](../references/interfaces/ISYS_MathPoint.md) |
| `ISYS_MathPolygonWithHoles` | Polygon with holes | 4 | [md](../references/interfaces/ISYS_MathPolygonWithHoles.md) |
| `ISYS_MessageBusTask` | Message bus task | 3 | [md](../references/interfaces/ISYS_MessageBusTask.md) |
| `ISYS_MultilingualLanguagesData` | Multilingual data | 0 | [md](../references/interfaces/ISYS_MultilingualLanguagesData.md) |
| `ISYS_PcbComparisonResponse` | PCB comparison response | 3 | [md](../references/interfaces/ISYS_PcbComparisonResponse.md) |
| `ISYS_RightClickMenuItem` | Right-click menu item | 6 | [md](../references/interfaces/ISYS_RightClickMenuItem.md) |
| `ISYS_ShortcutKeyData` | Shortcut key data | 5 | [md](../references/interfaces/ISYS_ShortcutKeyData.md) |
| `ISYS_ShortcutKeyDataWithCallFn` | Shortcut key data with CallFn | 2 | [md](../references/interfaces/ISYS_ShortcutKeyDataWithCallFn.md) |
| `ISYS_ShortcutKeyDataWithUserDefinedShortcutKey` | Shortcut key data with userDefinedShortcutKey | 2 | [md](../references/interfaces/ISYS_ShortcutKeyDataWithUserDefinedShortcutKey.md) |
| `ISYS_WindowEventListenerRemovableObject` | Window event listener can remove object | 3 | [md](../references/interfaces/ISYS_WindowEventListenerRemovableObject.md) |
| `IconProps` | 图标配置：通过 URL 或 CSS class 指定图标 | 2 | [md](../references/interfaces/IconProps.md) |
| `ImageProps` | 图片组件：展示单张图片 | 3 | [md](../references/interfaces/ImageProps.md) |
| `InputProps` | 输入框组件：支持下拉、搜索、清除、前后缀等多种形态 | 19 | [md](../references/interfaces/InputProps.md) |
| `ListChildren` | 列表项：支持多级嵌套分组 | 9 | [md](../references/interfaces/ListChildren.md) |
| `ListProps` | 列表组件：支持多级嵌套、图标、展开的列表 | 9 | [md](../references/interfaces/ListProps.md) |
| `ModalProps` | 模态弹窗：可拖拽、可调整大小的顶层弹窗 | 12 | [md](../references/interfaces/ModalProps.md) |
| `RadioGroupProps` | 单选组组件：一组互斥的单选选项 | 7 | [md](../references/interfaces/RadioGroupProps.md) |
| `RadioItem` | 单选组中的单个选项 | 3 | [md](../references/interfaces/RadioItem.md) |
| `ScrollerProps` | 滚动组件：虚拟滚动列表，仅渲染可见行 | 5 | [md](../references/interfaces/ScrollerProps.md) |
| `SelectListItem` | 下拉选项：支持多级嵌套分组 | 5 | [md](../references/interfaces/SelectListItem.md) |
| `SelectProps` | 下拉选择器：基于输入框的下拉选择控件 | 6 | [md](../references/interfaces/SelectProps.md) |
| `SlotProps` | 插槽组件：为父组件提供具名内容占位 | 2 | [md](../references/interfaces/SlotProps.md) |
| `StyleProps` | 通用样式属性：可被布局容器等组件继承的样式集合 | 13 | [md](../references/interfaces/StyleProps.md) |
| `TextAreaProps` | 多行文本输入组件 | 6 | [md](../references/interfaces/TextAreaProps.md) |
| `TextProps` | 文本组件：静态文本展示 | 5 | [md](../references/interfaces/TextProps.md) |

## 类型别名 (Type Aliases)

| 名称 | 描述 | 成员数 | 文档 |
|------|------|--------|------|
| `ISYS_LanguageKeyValuePairs` | Language data key value for | 0 | [md](../references/types/ISYS_LanguageKeyValuePairs.md) |
| `TPCB_LayerTypesOfInnerLayer` | Layer types allowed to be set for inner layers | 0 | [md](../references/types/TPCB_LayerTypesOfInnerLayer.md) |
| `TPCB_LayersInTheSelectable` | Selectable layers | 2 | [md](../references/types/TPCB_LayersInTheSelectable.md) |
| `TPCB_LayersOfComponent` | Layers of the device | 0 | [md](../references/types/TPCB_LayersOfComponent.md) |
| `TPCB_LayersOfCopper` | Layers of copper | 1 | [md](../references/types/TPCB_LayersOfCopper.md) |
| `TPCB_LayersOfCustom` | Custom layers | 0 | [md](../references/types/TPCB_LayersOfCustom.md) |
| `TPCB_LayersOfDimension` | Layers of the dimension | 1 | [md](../references/types/TPCB_LayersOfDimension.md) |
| `TPCB_LayersOfFill` | Layers of the fill | 2 | [md](../references/types/TPCB_LayersOfFill.md) |
| `TPCB_LayersOfImage` | Layers of complex polygon figures (SVG images, text) | 2 | [md](../references/types/TPCB_LayersOfImage.md) |
| `TPCB_LayersOfInner` | Inner layers | 0 | [md](../references/types/TPCB_LayersOfInner.md) |
| `TPCB_LayersOfLine` | Layers of the line | 2 | [md](../references/types/TPCB_LayersOfLine.md) |
| `TPCB_LayersOfObject` | Layers of binary embedded objects | 0 | [md](../references/types/TPCB_LayersOfObject.md) |
| `TPCB_LayersOfPad` | Layers of the pad | 0 | [md](../references/types/TPCB_LayersOfPad.md) |
| `TPCB_LayersOfRegion` | Layers of the region | 1 | [md](../references/types/TPCB_LayersOfRegion.md) |
| `TPCB_NumberOfCopperLayers` | Number of copper layers | 0 | [md](../references/types/TPCB_NumberOfCopperLayers.md) |
| `TPCB_PolygonSourceArray` | Single polygon source array | 0 | [md](../references/types/TPCB_PolygonSourceArray.md) |
| `TPCB_PrimitiveDimensionCoordinateSet` | Dimension coordinate set | 0 | [md](../references/types/TPCB_PrimitiveDimensionCoordinateSet.md) |
| `TPCB_PrimitivePadHole` | Pad drilling | 0 | [md](../references/types/TPCB_PrimitivePadHole.md) |
| `TPCB_PrimitivePadShape` | Pad shape | 1 | [md](../references/types/TPCB_PrimitivePadShape.md) |
| `TPCB_PrimitiveSpecialPadShape` | Special pad shape | 1 | [md](../references/types/TPCB_PrimitiveSpecialPadShape.md) |
| `TSYS_MathPolygonGroup` | Polygon group | 0 | [md](../references/types/TSYS_MathPolygonGroup.md) |
| `TSYS_MathPolygonInput` | Polygon input type | 4 | [md](../references/types/TSYS_MathPolygonInput.md) |
| `TSYS_PcbComparisonErrorCode` | PCB comparison failure error code | 0 | [md](../references/types/TSYS_PcbComparisonErrorCode.md) |
| `TSYS_ShortcutKeys` | Shortcut key | 0 | [md](../references/types/TSYS_ShortcutKeys.md) |

---

生成命令：`npm run build:docs`
