import { BoardsData, StockChartConfig, StocksListConfig } from "@/types";
import ReactGridLayout, {
  Layout,
  noCompactor,
  useContainerWidth,
} from "react-grid-layout";
import Dialog from "./Dialog";
import Button from "./Button";
import AddComponentForm from "./AddComponentForm";
import StocksMiniCardList from "./StocksMiniCardList";
import { patchBoard } from "@/api/boards";
import StockChart from "./StockChart";
import { ESource } from "@/enums";

interface Props {
  boardLayout?: BoardsData;
}

const BoardGrid = ({ boardLayout }: Props) => {
  const { width, containerRef, mounted } = useContainerWidth({
    measureBeforeMount: true,
  });

  const handleChangePosition = async (layout: Layout) => {
    if (!boardLayout?.layout.components) return;

    const componentsArray = [...boardLayout?.layout.components];
    let isMovedOne = false;
    layout.forEach((componentLayout) => {
      if (componentLayout.moved) {
        isMovedOne = true;
        const findedComponentIndx = componentsArray.findIndex(
          (component) => component.i === componentLayout.i,
        );
        componentsArray[findedComponentIndx] = {
          ...componentsArray[findedComponentIndx],
          x: componentLayout.x,
          y: componentLayout.y,
        };
      }
    });

    if (!isMovedOne) return;

    const newBoardLayout: BoardsData = {
      ...boardLayout,
      layout: { components: componentsArray },
    };

    await patchBoard(String(boardLayout.id), newBoardLayout);
  };

  if (!boardLayout || !boardLayout?.layout?.components)
    return (
      <div
        className="w-full h-full flex flex-col justify-center items-center gap-4"
        ref={containerRef}
      >
        <span className="text-h1 text-primary-gray text-center">
          Theres no components on board.
          <br />
          Lets add something
        </span>
        <Dialog
          trigger={
            <div className="flex w-[20%] justify-center">
              <Button>Add component</Button>
            </div>
          }
          title="Add component"
          description="Choose what to add to your board"
        >
          <AddComponentForm />
        </Dialog>
      </div>
    );

  if (boardLayout.layout.components.length === 0) {
    return (
      <div
        className="w-full h-full flex flex-col justify-center items-center gap-4"
        ref={containerRef}
      >
        <span className="text-h1 text-primary-gray text-center">
          Theres no components on board.
          <br />
          Lets add something
        </span>
        <Dialog
          trigger={
            <div className="flex w-[20%] justify-center">
              <Button>Add component</Button>
            </div>
          }
          title="Add component"
          description="Choose what to add to your board"
        >
          <AddComponentForm />
        </Dialog>
      </div>
    );
  }

  return (
    <div className="w-full h-full" ref={containerRef}>
      {mounted && boardLayout?.layout?.components && (
        <ReactGridLayout
          layout={[...boardLayout.layout.components]}
          width={width}
          gridConfig={{ cols: 12, rowHeight: 24, margin: [20, 20] }}
          compactor={{ ...noCompactor, preventCollision: false }}
          resizeConfig={{ enabled: false }}
          onDragStop={handleChangePosition}
        >
          {boardLayout.layout.components.map((component) => {
            switch (component.type) {
              case "Stock list":
                return (
                  <StocksMiniCardList
                    name={component.name}
                    symbols={(component.config as StocksListConfig).symbols}
                    key={component.i}
                  />
                );
              case "Chart":
                return (
                  <StockChart
                    symbol={
                      (component.config as StockChartConfig).symbol[0].value
                    }
                    source={
                      (component.config as StockChartConfig).symbol[0]
                        .source as ESource
                    }
                    key={component.i}
                  />
                );
              default:
                return null;
            }
          })}
        </ReactGridLayout>
      )}
    </div>
  );
};

export default BoardGrid;
