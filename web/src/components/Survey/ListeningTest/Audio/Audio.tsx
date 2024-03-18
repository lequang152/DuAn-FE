import { useEffect, useRef, useState } from 'react';
import MuteIcon from './MuteIcon';
import PlayIcon from './PlayIcon';

import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import Spinner from '../../../Elements/Spinner/Spinner';
import React from 'react';
import { LocalStorageService } from '../../../../utils/local_survey';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import axios from 'axios';
import GlobalVariable from '../../../../utils/GlobalVariable';

type Props = {
    src: string;
    onPlay: (audio: HTMLAudioElement) => any;
    id?: number;
    audio: HTMLAudioElement;
    answerToken: string;
    accessToken: string;
};

function convertTime(seconds: number) {
    let minutes = Math.floor(seconds / 60) || 0;

    let secs = Math.ceil(seconds - minutes * 60);
    if (secs > 59) {
        minutes += 1;
        secs = 0;
    }
    return `${minutes || 0}:${secs || 0}`;
}

export type LocalAudioData = {
    currentAudioTime: number;
    requests: number;
};

function AudioTag({ src, onPlay, id, audio, answerToken, accessToken }: Props) {
    const [isClick, setIsClick] = useState(false);
    const [shouldShowIcon, setShouldShowIcon] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);

    const ref = useRef<NodeJS.Timer>();
    const x = (audio?.currentTime / audio?.duration) * 100;
    const GlobalVariableInstance = GlobalVariable.getInstance();

    useEffect(() => {
        setShouldShowIcon(true);

        const local = LocalStorageService.getLocalStorageInstance();
        const data: LocalAudioData = local.get([accessToken, answerToken, 'audio', id + '']) || {};

        if (audio) {
            audio.currentTime = 0;
            audio.onended = () => {
                GlobalVariableInstance.setIsPlaying(false);
                setShouldShowIcon(true);
            };
        }

        return () => {
            if (audio) {
                audio.pause();
                GlobalVariableInstance.setIsPlaying(false);
            }
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [audio]);

    useEffect(() => {
        if (audio) {
            audio.onpause = function () {
                GlobalVariableInstance.setIsPlaying(false);
                clearInterval(ref.current);
            };
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (shouldShowIcon == true) {
            GlobalVariableInstance.setIsPlaying(false);
        } else {
            GlobalVariableInstance.setIsPlaying(true);
        }
    }, [shouldShowIcon]);

    return (
        <div className=" flex flex-col items-center" key={audio?.src}>
            {shouldShowIcon && (
                <div
                    id={id + '' || 'audio'}
                    onClick={async (e) => {
                        clearInterval(ref.current);
                        if (audio.paused) {
                            try {
                                await onPlay(audio);
                                audio.play();
                                setShouldShowIcon(false);
                                ref.current = setInterval(() => {
                                    const local = LocalStorageService.getLocalStorageInstance();
                                    const data: LocalAudioData =
                                        local.get([accessToken, answerToken, 'audio', id + '']) || {};
                                    data.currentAudioTime = audio.currentTime;
                                    local.set([accessToken, answerToken, 'audio'], id + '', data);
                                    setIsPlaying((prev) => !prev);
                                }, 500);
                            } catch (err) {
                                audio.pause();

                                GlobalVariableInstance.setIsPlaying(false);
                            }
                        } else {
                            // clearInterval(ref.current)
                            audio.pause();
                            GlobalVariableInstance.setIsPlaying(false);
                        }
                        setIsClick(!isClick);
                    }}
                    className="w-[30px] h-[30px] mx-3 my-4"
                >
                    <PlayCircleIcon className="cursor-pointer  text-black scale-200" />
                </div>
            )}
            <div className="flex flex-col items-center justify-center w-96">
                <ProgressBar progress={Number.isNaN(x) ? 0 : Math.round(x)} />
                <div className="">{`${convertTime(audio?.currentTime)} / ${convertTime(audio?.duration)}`}</div>
            </div>
        </div>
    );
}

export default React.memo(AudioTag);
