import type { FC } from 'react';
import { BookCopy, MessageSquarePlus, X } from 'lucide-react';
import { Content, Portal, Root, Trigger } from '@radix-ui/react-popover';
import { EditPresetDialog, PresetItems } from './Presets';
import { useLocalize, usePresets } from '~/hooks';
import { useChatContext } from '~/Providers';
import { cn } from '~/utils';

interface PresetsMenuProps {
  incrementViews: () => void;
  decrementViews: () => void;
}

const PresetsMenu: FC<PresetsMenuProps> = ({ incrementViews, decrementViews }) => {
  const localize = useLocalize();
  const {
    presetsQuery,
    onSetDefaultPreset,
    onFileSelected,
    onSelectPreset,
    onChangePreset,
    clearAllPresets,
    onDeletePreset,
    submitPreset,
    exportPreset,
  } = usePresets();
  const { preset } = useChatContext();

  const buttonClassName = cn(
    'pointer-cursor relative flex flex-col rounded-md border border-gray-100 bg-white text-left focus:outline-none focus:ring-0 focus:ring-offset-0 dark:border-gray-700 dark:bg-gray-800 sm:text-sm',
    'hover:bg-gray-50 radix-state-open:bg-gray-50 dark:hover:bg-gray-700 dark:radix-state-open:bg-gray-700',
    'z-50 flex h-[40px] min-w-4 flex-none items-center justify-center px-3 focus:ring-0 focus:ring-offset-0',
  );

  const presets = presetsQuery.data || [];
  return (
    <Root>
      <Trigger asChild>
        <button
          className={buttonClassName}
          id="presets-button"
          data-testid="presets-button"
          title={localize('com_endpoint_examples')}
        >
          <BookCopy className="icon-sm" id="presets-button" />
        </button>
      </Trigger>
      <div className="ml-auto flex gap-2">
        <button
          className={buttonClassName}
          id="add-button"
          data-testid="add-button"
          title={localize('com_add')}
          onClick={incrementViews}
        >
          <MessageSquarePlus className="icon-sm" id="add-button" />
        </button>
        <button
          className={buttonClassName}
          id="close-button"
          data-testid="add-button"
          title={localize('com_add')}
          onClick={decrementViews}
        >
          <X className="icon-sm" id="add-button" />
        </button>
      </div>
      <Portal>
        <div
          style={{
            position: 'fixed',
            left: '0px',
            top: '0px',
            transform: 'translate3d(268px, 50px, 0px)',
            minWidth: 'max-content',
            zIndex: 'auto',
          }}
        >
          <Content
            side="bottom"
            align="center"
            className="mt-2 max-h-[495px] overflow-x-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-700 dark:text-white md:min-w-[400px]"
          >
            <PresetItems
              presets={presets}
              onSetDefaultPreset={onSetDefaultPreset}
              onSelectPreset={onSelectPreset}
              onChangePreset={onChangePreset}
              onDeletePreset={onDeletePreset}
              clearAllPresets={clearAllPresets}
              onFileSelected={onFileSelected}
            />
          </Content>
        </div>
      </Portal>
      {preset && <EditPresetDialog submitPreset={submitPreset} exportPreset={exportPreset} />}
    </Root>
  );
};

export default PresetsMenu;
