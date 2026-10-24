(function (window) {
    'use strict';

    var FRAME_DURATION_MS = 900;

    function clamp(value, minimum, maximum) {
        return Math.max(minimum, Math.min(maximum, value));
    }

    function rankFor(frame, ownerId) {
        var row = frame.standings.find(function (entry) {
            return Number(entry.owner_id) === Number(ownerId);
        });
        return row ? Number(row.rank) : frame.standings.length;
    }

    function point(frameIndex, rank, frameDenominator, teamCount) {
        return {
            x: (frameIndex / frameDenominator) * 1000,
            y: ((rank - 0.5) / teamCount) * 1000
        };
    }

    function curveCommand(from, to) {
        var handle = (to.x - from.x) * 0.44;
        return 'C' + (from.x + handle) + ' ' + from.y + ' ' +
            (to.x - handle) + ' ' + to.y + ' ' + to.x + ' ' + to.y;
    }

    function buildPath(frames, ownerId, position, frameDenominator, teamCount) {
        var maximum = frames.length - 1;
        var safePosition = clamp(Number(position) || 0, 0, maximum);
        var lower = Math.floor(safePosition);
        var fraction = safePosition - lower;
        var start = point(0, rankFor(frames[0], ownerId), frameDenominator, teamCount);
        var commands = ['M' + start.x + ' ' + start.y];
        var previous = start;

        for (var index = 1; index <= lower; index += 1) {
            var completed = point(index, rankFor(frames[index], ownerId), frameDenominator, teamCount);
            commands.push(curveCommand(previous, completed));
            previous = completed;
        }

        var endpoint = previous;
        if (fraction > 0 && lower < maximum) {
            var next = point(lower + 1, rankFor(frames[lower + 1], ownerId), frameDenominator, teamCount);
            endpoint = {
                x: previous.x + ((next.x - previous.x) * fraction),
                y: previous.y + ((next.y - previous.y) * fraction)
            };
            commands.push(curveCommand(previous, endpoint));
        }

        return {
            d: commands.join(' '),
            xPercent: endpoint.x / 10,
            yPercent: endpoint.y / 10,
            frameIndex: Math.round(safePosition)
        };
    }

    function createPlayer(options) {
        var position = 0;
        var animationFrame = null;
        var lastTimestamp = null;
        var playing = false;

        function emit() {
            options.onPosition(position);
        }

        function setPlaying(value) {
            playing = value;
            options.onPlayingChange(playing);
        }

        function pause() {
            if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
            animationFrame = null;
            lastTimestamp = null;
            if (playing) setPlaying(false);
        }

        function setPosition(value) {
            position = clamp(Number(value) || 0, 0, options.getMaximum());
            emit();
        }

        function tick(timestamp) {
            if (!playing) return;
            if (lastTimestamp === null) lastTimestamp = timestamp;
            var elapsed = Math.min(64, timestamp - lastTimestamp);
            lastTimestamp = timestamp;
            position = Math.min(options.getMaximum(), position + (elapsed / FRAME_DURATION_MS));
            emit();
            if (position >= options.getMaximum()) {
                pause();
                return;
            }
            animationFrame = window.requestAnimationFrame(tick);
        }

        function play() {
            if (playing || options.getMaximum() <= 0) return;
            if (position >= options.getMaximum()) position = 0;
            if (options.reducedMotion()) {
                setPosition(options.getMaximum());
                options.onPlayingChange(false);
                return;
            }
            setPlaying(true);
            emit();
            animationFrame = window.requestAnimationFrame(tick);
        }

        return {
            getPosition: function () { return position; },
            setPosition: setPosition,
            play: play,
            pause: pause,
            toggle: function () { if (playing) pause(); else play(); },
            isPlaying: function () { return playing; }
        };
    }

    window.fs5PowerLinesTimeline = {
        buildPath: buildPath,
        createPlayer: createPlayer,
        frameDurationMs: FRAME_DURATION_MS
    };
}(window));
