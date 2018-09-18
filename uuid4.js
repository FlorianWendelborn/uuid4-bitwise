const bitwise = require('bitwise')

const print = (message, bits) =>
	console.log(`${message.padStart(3)}: ${bitwise.bits.toString(bits, 8, ' ')}`)

// Original Python 3.7 Source Code for UUID4 Generation

/*
def uuid4():
    """Generate a random UUID."""
	return UUID(bytes=os.urandom(16), version=4)
*/

/*
if version is not None:
	if not 1 <= version <= 5:
		raise ValueError('illegal version number')
	# Set the variant to RFC 4122.
	int &= ~(0xc000 << 48)
	int |= 0x8000 << 48
	# Set the version number.
	int &= ~(0xf000 << 64)
	int |= version << 76
*/

function uuid4(int) {
	const version = 4

	console.log(
		`generating uuid4 for:\n     ${bitwise.bits.toString(int, 8, ' ')}\n`
	)

	console.log('     int &= ~(0xc000 << 48):')
	const c0 = bitwise.bits.not([
		...bitwise.string.toBits('0'.repeat(64)),
		...bitwise.byte.read(0xc0),
		...bitwise.byte.read(0x00),
		...bitwise.string.toBits('0'.repeat(48)),
	])
	print('num', c0)
	const int2 = bitwise.bits.and(int, c0)
	print('res', int2)

	console.log('\n     int |= 0x8000 << 48')
	const c1 = [
		...bitwise.string.toBits('0'.repeat(64)),
		...bitwise.byte.read(0x80),
		...bitwise.byte.read(0x00),
		...bitwise.string.toBits('0'.repeat(48)),
	]
	print('num', c1)
	const int3 = bitwise.bits.or(int2, c1)
	print('res', int3)

	console.log('\n     int &= ~(0xf000 << 64)')
	const c2 = bitwise.bits.not([
		...bitwise.string.toBits('0'.repeat(48)),
		...bitwise.byte.read(0xf0),
		...bitwise.byte.read(0x00),
		...bitwise.string.toBits('0'.repeat(64)),
	])
	print('num', c2)
	const int4 = bitwise.bits.and(int3, c2)
	print('res', int4)

	console.log('\n     int |= version << 76')
	const c3 = [
		...bitwise.string.toBits('0'.repeat(44)),
		...bitwise.byte.read(version),
		...bitwise.string.toBits('0'.repeat(76)),
	]
	print('num', c3)
	const int5 = bitwise.bits.or(int4, c3)
	print('res', int5)
}

uuid4(bitwise.string.toBits('00011011'.repeat(16)))
console.log('-'.repeat(148))
uuid4(bitwise.string.toBits('0'.repeat(128)))
console.log('-'.repeat(148))
uuid4(bitwise.string.toBits('1'.repeat(128)))
